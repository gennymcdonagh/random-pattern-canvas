# random-pattern-canvas

Generates a canvas of randomly positioned, randomly coloured, randomly selected shapes. 
https://gennymcdonagh.github.io/random-pattern-canvas/

Uses a seeded random number generator:
https://github.com/davidbau/seedrandom
This way you can get the same pattern each time by providing the same seed in the query string, eg:
https://gennymcdonagh.github.io/random-pattern-canvas/?sunflowerseed1234
Or omit the query string and a random seed will be used.
Click the page to get a new seed and new pattern.

Uses Mitchell’s best-candidate algorithm to position the shapes so they are nicely spread out.
Thanks to Mike Bostock for useful info about the algorithm and code examples.
https://bost.ocks.org/mike/algorithms/