# CITY BUS TRACKING

# Stack

- [ReactJS](https://reactjs.org/) - A React framework with hybrid static & server rendering, and route pre-fetching, etc.
- [MapBoxAPI](https://www.mapbox.com/) - Mapbox GL JS is a JavaScript library for vector maps on the website

# Project structure

```
$PROJECT_ROOT
│   # Page files
├── MapBox (Home)
│   # Component
│   │
│   ├──SideBar
│   │   │
│   │   ├──Filter Router
│   │   │     │
│   │   │     ├──List Bus Stop (turn)
│   │   │     │     │
│   │   │     │     ├──Bus Stop
│   │   │     │     │
│   │   │     │     ├──Information Bus Route
│   │   │     │     │
│   │   │     ├──List Bus Stop (return)
│   │   │     │
│   │   ├──All Bus Stop
│   │   │     │
│   │   │     ├──Countdown bus stop (Counting the waiting time for the car to arrive at the station)
│   │   │     │
│   │   │     ├──Bus route near bus stop (Bus stop near bus route)
│   │   │     │
│   ├──Marker Bus Stop
│   │
│   ├──Polyline
│   # Static files for images
└── public
```
