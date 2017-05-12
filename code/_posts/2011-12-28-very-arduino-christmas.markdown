---
layout: post
title:  "A very Arduino Christmas"
date:   2011-12-28 17:02
tags: arduino electronics embedded
image:  arduino.jpg
---
This Christmas I thought it was finally time to start on a hardware project that I've been thinking about for a long time.

So, to that end I ask my brothers for an Arduino starter pack, and they dutifully delivered.

I am now the proud owner of an Arduino Uno, a USB Host Shield for it and an assortment of small parts to begin playing.

I, of course, started with the excellent little sample programs and quickly had an LED blinking on the board, then off the board. I then made the buzzer play a tune and had serial coms (or TTY ;)) working to the host computer. All very handy, but I'm not learning by copying sample code, so it was time to start adapting stuff to make my own project.

![Breadboard](/img/code/running5_bb.png){:.r}Initially I thought I'd create a set of five running lights, so I checked the various example programs and circuit diagrams. I found I needed a resistor on each of the LEDs, but they could all be connected to a common ground.

You should be able to see the idea from the circuit diagram attached.

![Running Lights](/img/code/running5.jpg){:.l}Now, on my mini breadboard I don't have a ground rail, so I snipped a length of wire into small jumpers to link a few rows together. I then added a jumper wire from one of those linked rows to ground on the controller.

I've included a picture of how it actually looked at the end of the build. The tiny home made jumpers are hidden behind the single ground cable in this picture, but they are there, and that's why the circuit works at all.

## The Code ##

Now on to the code. The Arduino uses C, linked to the [AVR libraries](http://www.nongnu.org/avr-libc/user-manual/index.html), so I didn't have any trouble getting a first pass at the code to make the lights run. I coded an array of pin addresses and iterated over that array, resetting the counter when it went over the end. As I went over the array, I'd turn the light off, increment the array index and turn the next light on. This gave me the running lights effect I wanted.

But it wasn't enough.

You'll see from the code attached that I didn't just pick the first five digital pins for this project. In fact, I didn't pick a block of five pins together at all. The pins I picked were five of the six available PWM pins. These pins support Pulse Width Modulation, which allows a digital controller, like the Arduino, to simulate an analogue output. In this context, it allows me to set a variable brightness on each LED.

The final code now also fades the LEDs after they have been put on. I also changed the code that picks which LED to deal with next so that instead of running one direction and then starting again, it goes back and forward to give the full KITT effect.

{% highlight c %}
    // Five of the PWM pins
    int pins[] = {5,6,9,10,11};
    // The length of the array above
    int numPins = sizeof(pins) / sizeof(int);
    // All the brightness values for each pin
    int bright[5]; // numPins (This should really be dynamically allocated)
    // miliseconds between the selection of each pin
    int delayTime = 100;
    // Fade the pins so they go out just as they are set bright again
    int fadeTime = delayTime / numPins;
    // 255 is full brightness, so calculate an even change across the time
    int fadeStep = 255 / fadeTime;
    // Sweep direction
    int dir = 1;
    // The current pin
    int pin;
    // The last time a pin selection was made
    unsigned long prevPinTime = 0;

    /**
     * Initialise the brightness to all zero and set
     * relevant pins to OUTPUT mode
     */
    void setup() {
      for (pin = numPins - 1; pin >= 0; pin--) {
        pinMode(pins[pin], OUTPUT);
        bright[pin] = 0;
      }
    }

    /**
     * Pick the next pin and set it to full brightness
     */
    void stepPins() {
      pin += dir;
      if (pin < 0 || pin >= numPins) {
        dir = dir * (-1);
        pin = pin + (dir * 2);
      }
      bright[pin] = 255;
    }

    /**
     * Iterate the brightness array, decrease each value and
     * set the corresponding pin to it's new brightness
     */
    void stepFade() {
      for (int i = 0; i < numPins; i++) {
        analogWrite(pins[i], bright[i]);
        bright[i] = (bright[i] <= fadeStep) ? 0 : bright[i] - fadeStep;
      }
    }

    /**
     * Call the fade function each loop and call the pins
     * function when needed.
     */
    void loop() {
      unsigned long now = millis();
      if (now - prevPinTime > delayTime) {
        prevPinTime = now;
        stepPins();
      }
      stepFade();
      delay(fadeTime);
    }
{% endhighlight %}

As you should be able to see from the above, this code maintains a list of all the pins, and a parallel list of the brightness values. It fades the values from full (255) to off in the same time it takes the code to sweep back to that pin, which sets it back to 255 again.

I said above that the initial idea was to create some running lights which were either on or off. These changes, the use of the PWM pins and the use of analogWrite instead of digital causes the lights to fade instead of just switch off and give that full KITT effect.

Night Rider, here we come.

