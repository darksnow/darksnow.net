---
layout: post
title:  Code URI Component
date:   2010-06-25 11:10
tags: Java JavaScript
image:  code.png
attachments: javascriptutils.java
---
JavaScript has a handy function built in called `encodeURIComponent()`, and the corresponding function `decodeURIComponent()`.

These functions allow you effectively strip out parts of a string that could cause problems when sent in a URI, in a get request for example.

I also recently found it handy for encoding strings for sending to and from a JSP server over AJAX, the trouble came up when I realised that there is no built in equivalent functions server side. A quick search of the net revealed a few solutions, but none that actually worked, not in Java, or PHP, or anything else that I could have adapted. A bit surprised by this lack of a solution to a common problem, I investigated what these functions do.

Well, quite simply, the decode function decodes whatever the encode function does, so it's behaviour depends entirely on what encode does. Once I had encode nailed, it would be easy to decode it.

The encode function, almost as simply, encodes each character as a percent sign (%) followed by it's two digit hex ASCII code. So, a space, for example, which is character thirty two, would become %20. We don't need to encode everything though. This code should allow characters that are valid and otherwise unused in URIs to get through. So, that's all alphanumeric characters, upper and lower case, and all numbers as well as any punctuation characters that are not already reserved in URIs, which are asterix, plus, minus, tilde, curved brackets, single quote and exclamation mark. Most sources I found also included the space character in that list, but in practice I found that most browser encode space as above.

So, the solution I came up for this is to loop over all characters in the string, if it's in the valid set, write it to the output, otherwise, write a percent sign and the hex code. Sounds like this needs a regular expression.

The Java regular expression, for use with the `String.matches()` function is `"[*+-~()'\\w[\\!]]"`.

The `\w` is a set representing all letters of both case and all numeric digits, also the exclamation mark is a special character so needed to be escaped and put inside it's own set before it worked.

Lucky for me, Java does most of the hard work. It's has built in regular expression support and can convert a character to a hex code so the encode function was straight forward to write. The decode simply dumps every character to the output until it finds a percent sign, in which case it translates the next two hex digits to an ASCII code and writes out the resultant character.

The full Java source of this solution, as static methods, is attached. I hope somebody finds it useful.
