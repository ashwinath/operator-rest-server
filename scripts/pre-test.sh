#!/bin/bash
cdir=$(pwd);
cd;
git clone https://github.com/ashwinath/operator-batch batch;
cd batch;
yarn;
yarn test;
cd $cdir;
