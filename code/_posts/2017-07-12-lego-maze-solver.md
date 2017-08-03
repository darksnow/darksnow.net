---
layout: post
title: LEGO maze solver
tags:
 - LEGO
 - Code Club
image: maze-crawler.jpg
---
![The test maze](/img/code/maze.jpg "The test maze"){:.r}

In my code club I asked the kids to solve a maze. This is an easy enough task for primary school kids but what I was really leading them to was a means of solving any maze. Maze traversal is a classic computer science problem, something I studied in university, so I wasn't expecting them to work out the solution from first principles. Instead I gave them clues and we discussed several solutions before they found the [wall follower](https://en.wikipedia.org/wiki/Maze_solving_algorithm#Wall_follower) algorithm. To demonstrate this and bring things to life for them, I built a LEGO rover to solve any maze.

The size of the rover, dictated by the size of a LEGO RCX, meant that I needed a large maze. For this I went to a local supermarket and asked them for the sheets of paper you get between layers of sugar. They gladly allowed me to take two. I stuck them together with packing tape (the brown line you can see on the maze) which gave me a large enough surface to mark out a half decent maze.

Typically a maze would have walls, so I would need to create a rover which touched the relevant wall to complete the maze. If I'd done that, I would have had to build and transport a big cardboard maze. Instead I used black electrical tape to create a flat maze which could be rolled up and transported easily. Rather then using the black lines as the wall of the maze, they form the path which the rover has to follow.

## Following a line

The first step in being able to solve this maze, is being able to follow a line. As it happens this is not as straight forward as it might appear. We can't just find the line and then tell the LEGO rover to drive in a straight line down it until something happens. The real world is not perfect so there are no real straight lines. There might be a slight curve to the paper or the tape I stuck down. Maybe the rover is not quite aligned to the track, or perhaps the two motors driving the rover will turn at slightly different speeds. All of these things cause a real world robot to eventually drift off the line.

In the real world, to follow the line we need to be able to see the line. This requires a light sensor and these simple steps which allows the robot to follow an apparently wiggly line:

  - Move forward until we lose the line
  - Turn one way far enough to find the line
  - If we don't find the line turn the other way
  - Once we find the line, carry on moving forward

The one optimisation I added to the above algorithm, is the assumption that if you tried to turn clockwise last time, you'll likely need to do so again. If you are trying to follow a straight line but are just slightly off track, then continually adjusting in the same direction allows you to straighten up. Eventually you will cross over the line and will need to try the opposite direction but overall this small consideration saves the rover a lot of time.

The result of these simple rules is shown in the following pattern of movement. The orange line shows the path of the light sensor. It moves across the path it needs to follow until it can no longer see the line. It then turns anti-clockwise far enough to find the line. Finding nothing it then tries the opposite direction. Once it finds the line it carries on across the line until it again loses the line. Since our last search was clockwise we try that again. This time we don't find the line and need to try anti-clockwise until we do, then carry on forward again. This carries on for three more turns until the curve of the line favours our strategy and we find the line by turning a little to the right each time.

{% include code/maze-curve.svg %}

Seems simple enough. With the main program moving forward until we lose the line, the code below creates the turns required to search for, and reacquire, the line we're trying to follow.

{% highlight c %}

int lastTry = 1; // 1 = Clock, 0 = Anti

/**
 * Find the line again
 */
sub Search() {
  int found = 0; // Have we found the line
  int i;
  for (i = 1; i <= 2; i++) {
    ClearTimer(0);
    if (lastTry) { SpinClock; } else { SpinAnti; }
    do {
      // If the light sensor goes dark enough, we've found the line
      if (SENSOR_3 <= LIGHT_THRESHOLD) {
        found = 1;
        break; // break do loop
      }
    } while (Timer(0) < (maxTime * i));
    if (found) break; // break for loop

    // Flip lastTry so we turn the other way
    lastTry = ((lastTry == 0) ? 1 : 0);
  }

  // If we have still not found the line after the small wiggle
  // assume a left search bot would have spotted the left turn
  // so turn right until we do find the line.
  if (!found) {
    SpinClock;
    until (SENSOR_3 <= LIGHT_THRESHOLD);
  }
}
{% endhighlight %}

The `LIGHT_THRESHOLD` value shown here is a number representing the value from a LEGO light sensor. When that number drops, it indicates something dark has been found. The threshold value is just a number between the light of the maze background and the dark of the black line.

## The rover

Now that we have a plan in place, it was time to build a rover to test this code. In order to allow the rover to spin I decided to add caterpillar tracks to an RCX.

![Maze Crawler Side View](/img/code/maze-crawler-side.jpg "Maze Crawler Side View")

Since this rover would need to follow a line, it would need a light sensor. It would also need a second sensor to help it find any turns in the path and allow it to solve the maze.

![Under Maze Crawler](/img/code/maze-crawler-bottom.jpg "Under Maze Crawler")

As you can see from the placement of the light sensors, the right hand sensor lends itself to an almost central placement, better for following the line. It is placed a little ahead of the central axis of rotation of the rover so any turns cause it to sweep sideways and detect the line again.

When I tested my initial build I found that the rover was simply too fast. By the time it decided it had lost the line it had already gone too far and it was difficult to reacquire the track. To combat this I had to modify the rover.

![Maze Crawler Rear View](/img/code/maze-crawler-rear.jpg "Maze Crawler Rear View")

I added a LEGO gearing mechanism to slow down the tracks. I also needed to move the left hand light sensor away from the main sensor since it was picking up the edge of the main track and confusing the system. This just reinforces what I told my pupils in the code club; the real world is not perfect and these things, when taken out of a computer and placed into real hardware, can get complicated.

## The solution

Once I had the hardware working properly, the solution to the maze problem turned out to be quite simple. Before I describe how it was actually done, here is a video of the crawler doing its thing. The voice over is a little quiet but it describes what the rover is actually doing.

<div class="video">
<iframe src="https://player.vimeo.com/video/224688446" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
</div>

Using the line follower function, as shown above, to solve a maze is actually pretty easy. In the code given below `SENSOR_3` is the central sensor which follows the line with `SENSOR_1` situated on the left as the rover is driving along.

{% highlight c %}
int in_maze = 0;

/**
 * Start moving then watch the light sensor
 */
task main() {
  SetSensor(SENSOR_1, SENSOR_LIGHT);
  SetSensor(SENSOR_3, SENSOR_LIGHT);

  Forward();
  // Move forward until we detect the dark line
  until (SENSOR_3 <= LIGHT_THRESHOLD);
  in_maze = 1;

  while (in_maze) {
    Forward();
    // If we can no longer see the line
    if (SENSOR_3 > LIGHT_THRESHOLD) {
      Stop;
      // Run search algorithm from the top of this page.
      Search();
    }

    // Track detected to the left
    if (SENSOR_1 < LIGHT_THRESHOLD) {
      Wait(18);    // Wait to allow us to cross path a little
      lastTry = 0; // Make sure the next search tries anti clockwise
      SpinAnti;

      // Spin until we lose the line we're already following
      until (SENSOR_3 > LIGHT_THRESHOLD);

      // Keep spinning until we find the left hand line
      until (SENSOR_3 <= LIGHT_THRESHOLD);
    }
  }
}

{% endhighlight %}

All this code does, is get the rover to find the line and enter the maze. Then while it's in the maze it follows that line using the search algorithm. When the main sensor, `SENSOR_3`, detects a light patch, it knows it has lost the path so searches.

If the left sensor, `SENSOR_1`, detects darkness, we wait enough time for the sensor to pass fully into the left hand path, 18 milliseconds should do it. Knowing we have to turn left, we signal to the search function that we should now try anti-clockwise, then we turn in that direction. The main sensor then detects a bright area, so it has lost the main path, and we keep spinning until the light level drops again indicating that the main sensor is back on the dark path. From there we just continue the normal search and follow that line instead. These simple rules allow this rover to implement the left hand maze traversal.

Now that you know how the rover is making decisions, watch the video again and try to follow what the code above is doing as it's doing it. When I was testing this, I had the LEGO RCX make different noises to tell me when it had lost and acquired the path and when it found a left turn. Those noises helped me keep track of what the rover was doing and allowed me to tweak the settings in the code to make it all work. If you listen carefully to the video, you can hear the rover making decisions.

## Looking back

The one thing missing from this solution is a stop condition, so that the rover knows when it has completed the maze. In the video you can see a front bumper on the rover. This has a button behind it so when the rover hits something, it can then play a little tune in celebration of solving the maze. This is not really relevant to the core of the maze solver so I've left it, and other sounds, out of the code published here for brevity.

When building websites for a living, or teaching kids programming in a code club, it's all too easy to forget the complexity of the real world. Hardware hacking even something as simple as this rover reminded me that no matter how simple the model, the real world will complicate things. It's great building something like this, something tangible that the kids can see working. I think projects like this help cement the idea of programming in their minds.

I was also pretty pleased with myself, and more than a little surprised that it worked so well!
