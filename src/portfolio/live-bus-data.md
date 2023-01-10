---
title: Live Bus Data
year: 2019
order: 1
synopsis: >
  How we made TfGM's real-time bus data available for internal and external users

technologies:
  - Go (Golang)
  - AWS Lambda
  - AWS API Gateway
  - AWS SNS
  - AWS ElastiCache (Redis)
  - AWS CloudWatch
  - AWS S3
  - TransXChange
  - SIRI-ET
  - SIRI-VM

---
## Background

In 2015, TfGM entered into a contract with a third-party supplier to develop "OPTIS": a large, wide-ranging IT 
procurement that promised to deliver many things, including APIs for real-time bus data. [^1]

[^1]: OPTIS was a big enough contract to warrant [a press release from Cubic](https://www.cubic.com/news-events/news/cubic-deliver-intelligent-travel-platform-transport-greater-manchester)

Unfortunately, these APIs never went live. As a result, TfGM was unable to provide many services that 
would have relied on this data, or alternative sources of the data had to be found.

One example of the latter is TfGM.com: the site would have used the OPTIS APIs as the source of live bus data for its 
bus stop and bus station pages. Instead, TfGM ended up using an expensive third-party API for this purpose, which did 
not include live times for Greater Manchester's largest bus operator. [^2]

[^2]: The [Traveline NextBuses API](https://www.travelinedata.org.uk/traveline-open-data/nextbuses-api/) cost £0.96 per 1,000 requests. Not cheap, with around 20,000 bus stops and a metropolitan area population of 3 million.

## Getting the data

Once it was clear that OPTIS was not going to deliver, it fell to my team to find a solution.

We needed access to the bus operators' SIRI-ET (Estimated Timetable) and SIRI-VM (Vehicle Monitoring) data 
feeds, which would provide the raw real-time data we needed. The bus operators had all partnered with third-party 
suppliers to provide a SIRI service on their behalf, and I had to build relationships with these suppliers, get 
access to the feeds, and work through a number of technical issues with them.

With the SIRI feeds now available to us, I had to gain a deep understanding of the SIRI standard and the nature of 
the third-party systems we were interacting with. The HTTP endpoint that the SIRI feeds would send data to had to handle
multiple simultaneous payloads of up to 5MB and provide a HTTP response in under one second. 

I designed and built the system that handles these payloads, and creates, monitors and maintains the SIRI subscriptions
with the third-party suppliers.

## Providing the data to third parties

With the SIRI data now coming in, TfGM was keen to provide this data to third-party service providers. For example, 
TfGM contracted with a data analysis company; we provided them with a SIRI-VM feed (Vehicle Monitoring), which 
provided the company with real-time vehicle location data. The company uses this data to
measure and report upon the performance of bus services in Greater Manchester.

I designed and built a system that effectively mirrored the SIRI feeds that were coming in from the bus operators,
making the data instantly available to third parties.

My team also built the application that [converts the SIRI-ET into a GTFS Realtime feed](/portfolio/siri-et-to-gtfs-realtime-converter/).

## Using the data within TfGM

We were also keen to use the data for our own systems. For my team alone, we would be able to significantly reduce the 
operational costs for providing live bus times on TfGM.com if we could use the data from the SIRI-ET feeds,
rather than relying on an expensive third-party API.

I updated the back-end service that provided bus timetable information on TfGM.com so that it utilized SIRI-ET data
from our own feeds, saving tens of thousands of pounds per year. This service provides departure data all the bus 
stations and stops in Greater Manchester and its neighbouring counties.

You can see the data in action at:

- [Piccadilly Gardens Bus Station](https://tfgm.com/public-transport/bus/stations/manchester-piccadilly-gardens-bus)
- [Portland Street / Chinatown (Stop CU)](https://tfgm.com/public-transport/bus/stops/1800SB04791)
- ...and at about 20,000 other stops on TfGM.com!

## Conclusions

My small team succeeded where a large multi-national corporation failed. We delivered value quickly and incrementally. 
We built a system that provides TfGM with an incredibly rich source of real-time bus data. My work has ultimately
enabled TfGM to gain valuable insights into how the bus network performs, and it has provided the travelling public 
with real-time information about the vast majority of bus services operating in Greater Manchester.

There is so much more that I would have loved to have worked on with these real-time data feeds, had there been the
opportunity. For example, my personal experience is that the estimated times from the SIRI-ET feeds aren't always 
that accurate. I would have loved to explore how much of a problem this actually is: using vehicle location data to
determine when a bus actually arrived at a given stop, and compare that to when it was predicted to arrive. And -
if the evidence supported the hypothesis that the estimated times are inaccurate, could we use the vehicle location
data to make more accurate predictions?