# CITY BUS TRACKING

# Stack

- [ReactJS](https://reactjs.org/) - A React framework with hybrid static & server rendering, and route pre-fetching, etc.
- [MapBoxAPI](https://www.mapbox.com/) - Mapbox GL JS is a JavaScript library for vector maps on the website

# Project structure

```
$PROJECT_ROOT
│   # Page files
├── Home
│   # Component
│   │
│   ├──HomeSidebar
│   │   │
│   │   ├──FindRoutes
│   │   │     │
│   │   ├──BusRoutes
│   │   │     │
│   │   │     ├──FilterRoutes
│   │   │     │       │
│   │   │     │       ├──FilterTravelMap
│   │   │     │       │         │
│   │   │     │       │         ├──ListGuideTravel
│   │   │     │       │         │        │
│   │   │     │       │         │        ├──MarkerTravelLocation (TravelType, TravelImage)
│   │   │     │       │         │        │
│   │   │     │       ├──ListBusStopInRoute
│   │   │     │       │
│   │   │     ├──ListAllBusStop
│   │   │     │       │
│   │   │     │       ├──BusLocation
│   │   │     │       │
│   │   │     │       ├──RouteThrough
│   │   │     │       │
│   ├──PolylineBusRoutes
│   │
│   ├──MarkerBusRoutes
│   # Common
│   ├──MarkerBusStop
│   │
│   ├──ConfirmModal
│   │
│   ├──CustomSidebar
│   │
│   ├──FormInput
│   # Static files for images
└── public
```

# Demo

![Ảnh ví dụ](https://github.com/thairyo/city-bus-tracking/blob/master/documents/danabus-routes.gif)
![Ảnh ví dụ](https://github.com/thairyo/react-trello-clone/blob/master/front-end/public/danabus-directions.gif)
