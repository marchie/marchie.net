---
title: Metrolink Service Updates and Planned Network Improvements
year: 2015
order: 6
synopsis: >
  Letting people know about incidents on the tram network that might affect their journey

technologies:
  - PHP
  - Laravel
  - AWS EC2
  - AWS ElastiCache (Redis)
  - AWS RDS (MySQL)

---
I developed the API used by TfGM.com, Metrolink phone apps and third parties that provides information about current 
and future disruptions on Manchester's Metrolink tram network. Development included an administrative backend which 
provides role-based access to TfGM and Metrolink staff to manage disruption data and the application's model of the 
Metrolink network.

The data from this API is used for the "Live tram updates" and "Planned improvement works" sections on TfGM's 
tram page: https://tfgm.com/public-transport/tram/

The data is also available for anybody to consume via [TfGM's Developer portal](https://developer.tfgm.com/). 
(Signup required)
