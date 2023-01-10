---
title: TransXChange to GTFS Converter
year: 2020
order: 3
synopsis: >
  The service which publishes Greater Manchester's public transport timetable data in GTFS format

technologies:
  - Go (Golang)
  - AWS Lambda
  - AWS CloudWatch
  - AWS S3
  - TransXChange
  - NaPTAN
  - GTFS

---
The service which transforms TfGM's public transport timetable data from the TransXChange format to
GTFS static format and publishes the data automatically. [^1]

[^1]: More information on these formats is available at the [gov.uk TransXChange collection](https://www.gov.uk/government/collections/transxchange) and the [GTFS static reference](https://gtfs.org/static)

The service takes about 3 minutes to process and publish around 2.5 million records.

## Background

UK public transport bodies and bus operators use TransXChange to exchange bus schedules and related data. However,
while TransXChange is extensible and rich, it is quite complex and hard to understand - 
the schema guide is 290 pages long!

The General Transit Feed Specification (GTFS) is a far simpler standard which is much more commonly used around the
world, and TfGM's research showed that potential consumers of public transport data (such as application developers)
would typically prefer to use GTFS data rather than TransXChange.

TfGM has published its public transport schedules as an Open Data GTFS dataset on data.gov.uk since 2014. [^2]

[^2]: You can download the GTFS static data from [data.gov.uk](https://www.data.gov.uk/dataset/c3ca6469-7955-4a57-8bfc-58ef2361b797/gm-public-transport-schedules-gtfs-dataset)

However, behind the scenes, the process for creating and publishing the GTFS data was very inefficient and very fragile.

## The legacy process

The Central Data Maintenance team at TfGM hold the responsibility for maintaining Greater Manchester's public transport
data. They gather data from the various bus operators, check for quality issues and correct errors, and make the data
available for wider use.

The legacy GTFS process was horribly broken.

The process started with data held in a legacy IBM iSeries database which was only really used for this purpose -
meaning that the Central Data Maintenance team had to "double-key" their data into this database, as well as
maintaining the TransXChange dataset that was used elsewhere.

From there, the data stored in the iSeries would be converted to ATCO-CIF format - a really old standard that uses
fixed-width records. This involved running "the job" - Central Data Maintenance would call a Software Engineer, who
would log on to a Windows server and manually invoke steps in a Visual Studio project, which would take the data from
the iSeries and output the ATCO-CIF files. (And often fail while doing so!) [^3]

[^3]: [Tim Howgego's blog](https://timhowgego.wordpress.com/2007/08/26/introduction-to-uk-local-public-transport-data/) provides an excellent introduction to UK local public transport data.

<figure aria-hidden="true">
<pre>
<code>
QSN319 020S3_20110104219912311111100  S3        LFBUS           O
QE20120604201206040
QE20120605201206050
QE20120827201208270
QO340000006R5 0655   T1
QI34000000008 07000705B   T1  
QI340000864B2 07050705B   T0   
QI340001864OPG07170717B   T0  
QI340001865OPP07190719B   T1  
QI340001536STO07190719B   T0  
QI340003246OPP07210721B   T0  
QI340001534OUT07230723B   T1  
QI340001866W  07240724B   T0  
QI340000924N  07260726B   T0  
QI340001004OUT07290729B   T1  
QI340001867OPP07300730B   T1  
QI340001868OPP07320732B   T0  
QT340000595VD 0733   T1
</code>
</pre>
  <figcaption>An example of ATCO-CIF data</figcaption>
</figure>

Then, an old, unsupported third-party application would convert the ATCO-CIF files to a GTFS static ZIP file - and take
up to 16 hours to complete.

Once the process completed, a notification was sent out via email and a member of the Central Data Maintenance team
would upload the GTFS ZIP file to the Open Data portal using an FTP client.

So - all in all, a very manual, very slow, very unreliable and very frustrating process, which as a result was only
undertaken about once per week.

## The replacement

The replacement service that I developed is a huge improvement on the legacy process, removing the need to "double-key"
data and automating previously manual steps.

The new process starts when the Central Data Maintenance team uploads a TransXChange dataset to an AWS S3 bucket.

An S3 `ObjectCreated` event triggers a Lambda function, which reads the TransXChange data and generates the
GTFS static data from it. The Lambda outputs the GTFS data to an S3 bucket, which then triggers another S3
`ObjectCreated` event. This triggers a second Lambda function which uploads the GTFS data to TfGM's Open Data portal
without any manual involvement.

## Conclusions

Overall, I'm really proud of this application. Compared to the old process, the performance is in a totally different
league, and it's not running on a creaking Windows server. But more than that, it eliminated a lot of laborious manual 
work for two teams that that already have too much on their plates. And - it means that TfGM can provide a better 
service to the people of Greater Manchester: the GTFS dataset is now updated much more frequently than it was!

There are some things that I'd have liked to have improved further, had there been the opportunity. 

I'd have liked to have given the Central Data Maintenance team better visibility of the process, possibly through 
notifications and/or a dashboard. On occasions when the process failed, 99% of the time it was because of a problem 
with the data. Similarly, I'd have loved to have worked more closely with the Central Data Maintenance team to see if
it was possible to improve their data validation processes through automation.

It would have been good to explore if we could have reduced or eliminated the remaining manual
part of the process; for example, by having an application that automatically copied the TransXChange file to the S3
bucket. 

And - a minor thing maybe - but I wonder if we could have done anything to update the metadata on the
[data.gov.uk page](https://www.data.gov.uk/dataset/c3ca6469-7955-4a57-8bfc-58ef2361b797/gm-public-transport-schedules-gtfs-dataset),
because this implies that the data isn't being updated when it is!