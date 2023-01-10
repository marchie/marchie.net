---
title: TfGM.com Bus Timetables
year: 2020
order: 7
synopsis: >
  Providing bus timetable information for around 20,000 bus stops in Greater Manchester and neighbouring counties

technologies:
  - Go (Golang)
  - AWS Lambda
  - AWS API Gateway
  - AWS SNS
  - AWS ElastiCache (Redis)
  - AWS CloudWatch
  - AWS S3
  - TransXChange

---
## Background

In 2015, TfGM entered into a contract with a third-party supplier to develop "OPTIS": a large, wide-ranging IT
procurement that promised to deliver many things, including a set of journey planning tools named "MyTfGM". [^1]

[^1]: OPTIS was a big enough contract to warrant [a press release from Cubic](https://www.cubic.com/news-events/news/cubic-deliver-intelligent-travel-platform-transport-greater-manchester)

The OPTIS contract came to an end, and with that, MyTfGM would be shut down. My team were handed a 
hard deadline to develop a service that would replace the MyTfGM bus timetable functionality.

## Development

We assessed whether we should replace the service like-with-like, and quickly determined that we should not: the user
experience was terrible! MyTfGM presented bus times in a huge table: the first column contained each stop on the route,
then each subsequent column contained the times for a journey. A user would need to scroll down vertically to find
their stop, then scroll across horizontally to read the times for that stop. Worst of all, the first column wasn't
fixed in place, so when the user scrolled horizontally, they could no longer see which stop each row referred to! It was
bad on a large screen, and completely unusable on mobile.

Given the short time available to us, we sought inspiration from how other major cities presented their timetable 
information, and we designed and built a solution based on what we felt were the best features of each. We concluded
that the user experience was be better if a smaller volume of information was presented on the page.

I worked primarily on the back-end aspect of the application, building four distinct pieces of functionality:

- Bus route search - which bus routes match a given query?
- Stops on route - given a bus route, which stops do its services call at?
- Times for stops - given a bus route and a bus stop, when do services on the route call at the stop?
- Times for journey - given a bus stop, a bus route and a bus service, what are the subsequent stops and times for 
  that service?

The application uses the following datasets:

- NaPTAN - National Public Transport Access Nodes - contains all the public transport access points in the UK;
- NPTG - National Public Transport Gazetteer - contains all the localities in the UK in a hierarchical format; and
- TransXChange - a public transport timetable interchange format.

The application is available at: [https://tfgm.com/bus/timetables](https://tfgm.com/bus/timetables)

## Challenges

For bus route search, we found that the running board information in the TransXChange was not always particularly
descriptive. So, I developed functionality that would output a more meaningful running board based on the locations
that the route served.

Before:
```
172 - Newton Heath - Chorlton
```

After:
```
172: Newton Heath - Droylsden - Gorton - Burnage - Chorlton
```

Also, when listing the stops on a route, there were complications caused by route variations and how we should present 
them. I developed functionality that determined the most appropriate order for stops on each route. [^2]

[^2]: A route variation is when a service runs with the same route number, but behaves differently compared to the typical route. For example, a service may make an additional call at a cinema complex in the evening, but won't call at the stop during the day.

## Conclusions

We significantly improved upon the functionality provided by MyTfGM and delivered it in good time before the MyTfGM
service was shut down.

However, I'd have liked us to have engaged in more user research to determine whether the bus timetables functionality 
is actually valuable for users. My hypothesis is that users would choose to use a journey planner rather than referring 
to timetable information.
