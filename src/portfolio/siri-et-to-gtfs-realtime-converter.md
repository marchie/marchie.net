---
title: SIRI-ET to GTFS Realtime Converter
year: 2021
order: 4
synopsis: >
  Making Greater Manchester's real-time bus data available in in GTFS Realtime format

technologies:
  - Go (Golang)
  - AWS Lambda
  - AWS API Gateway
  - AWS SNS
  - AWS CloudWatch
  - AWS S3
  - SIRI-ET (Estimated Timetable)
  - GTFS Static
  - GTFS Realtime
  - ProtoBuf (Protocol Buffers)

---
## Background

Once TfGM gained access to real-time bus data, my team engaged in user research with prominent users of our 
Open Data to establish whether they had any desire for real-time bus information and what format they would 
prefer to consume that data in. All the users we asked had a keen interest in getting access to real-time 
bus data. And the majority of users had a strong preference for the data to be in GTFS Realtime format, 
as compared to SIRI-ET format.

## Development

I worked with two other software engineers on this application; they were quite new to the team and the public transport
domain. We worked closely together, sharing knowledge, using pair programming and carefully considered code reviews 
to build a high quality application.

- A static data loader, which periodically loaded the next few hours of GTFS Static data into the database;
- A real-time matcher, which consumed the SIRI-ET data feed, matching relevant records in the database and updating them; and
- A public API, which provides GTFS Realtime data via an authenticated HTTP GET request.

## Beta and iterative improvement

We were excited to work with our users and we gave them access to a beta version of the service, so that we could 
validate that our service satisfied their needs. 

We soon received some really useful feedback around the consistency of IDs within the realtime data. Whereas we were 
always using the latest version of our GTFS Static data, our users were only fetching the GTFS Static data from us
periodically. With a better understanding of our user needs, we implemented a solution that would improve the 
consistency of IDs between the GTFS Realtime and GTFS Static data over a longer period, before we put the application
"live".

## Conclusions

This was a really fun application to work on. It was great to build an application from the ground up with two
really talented colleagues - I write better code now through having worked with them. 

I enjoyed sharing my domain knowledge of the intricacies and idiosyncrasies of Greater Manchester's bus timetable data, 
flagging particular "gotcha" services that we would need to handle in our logic: a service that call at the same 
stop twice, during the middle of the route? ... You bet there is! [^1]

[^1]: The [403 Oldham to Heyside circular](https://tfgm.com/public-transport/bus/routes/403-oldham) calls at Shaw Town Centre (Stop C) twice, mid-route. Don't ask me why!