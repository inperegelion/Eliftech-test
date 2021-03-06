# ELIFTECH TEST TASK

#### ⚠️ important! ⚠️

_You are looking at the master branch. The code here was written in three days (first deadline). To see what I've done later - switch to the second branch._

### Run

To run this repo on your machine with yarn, you need this commands:

```
yarn
yarn build
yarn run-api
yarn start
```

See the `./.env` file to connect to your local MongoDB server

---

### TASK

#### Technology stack

##### Required technologies to use:

- React.js ✅
- Node.js ✅
- MongoDB ✅

##### Would be a plus:

- Redux ❌
- MongoDB aggregations ❌

##### The task is

to make a web-page, which contains such components:

- list of “order” records ✅
- form to upload order elements from CSV file ✅

##### The orders list​ should have such functionality:

- paging (on server-side) ✅
- (optional) sorting by fields ✅

##### The form​ should contain:

- file input to upload the CSV file (optional by filtering only CSV files in the directory) ✅
- button to upload the file ✅
- (optional) CSV file data validation on the server-side ✅
- On the API side, you may use any library to connect to DB and handle CRUD operations, the same is for routes itself. ✔️ require("mongodb").MongoClient;

(optional) Would be a plus​ to download the full order records data as the CSV report, grouped by ​user emails​ and ​months​.❌
