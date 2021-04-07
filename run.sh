#!/bin/bash
docker run -d --link mongodb-local:mongodb-local -p 49300:49300 --name modelab-challenge li0t/modelab-challenge