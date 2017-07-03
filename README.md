# Operator Rest Server
[![Build Status](https://travis-ci.org/ashwinath/operator-rest-server.svg?branch=master)](https://travis-ci.org/ashwinath/operator-rest-server)
[![codecov](https://codecov.io/gh/ashwinath/operator-rest-server/branch/master/graph/badge.svg)](https://codecov.io/gh/ashwinath/operator-rest-server)

Server that is used to power the operator software.

## API
* `/news/sources` gives the news sources available.
* `/news/{source}` gives the top news for the news source.

## Operator
This software is to be used in conjunction with [Operator Batch](https://github.com/ashwinath/operator-batch) and [Operator Front End](https://github.com/ashwinath/operator-front-end).
