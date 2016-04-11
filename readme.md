## REST API

This API will contain use of (HATEOS) Hypermedia as the Engine of Application State


## Structure

- models
  - This holds your models using mongoose
- controllers
  - This holds your route functions
- routes
  - This holds the routes for the api
- tests
  - itemController test (basic so far)


## Example API Routes

| URL Endpoint                            | Request Type | Details                                                      |
|-----------------------------------------|--------------|--------------------------------------------------------------|
| http://localhost:4000/api/items         | GET          | Get a list of items                                          |
| http://localhost:4000/api/items         | POST         | Post an item to items                                        |
| http://localhost:4000/api/items/:itemID | GET          | Get single item using itemID                                 |
| http://localhost:4000/api/items/:itemID | PUT          | Update/replace whole single item using itemID                |
| http://localhost:4000/api/items/:itemID | PATCH        | Update/modify specific data for single item using the itemID |
| http://localhost:4000/api/items/:itemID | DELETE       | Delete single item using itemID                              |



To start the api:

`
gulp
`
In terminal


You can run tests by doing:

`
gulp test
`
In terminal


## TODO

- [ ] Add more tests
- [ ] Add HATEOS to self document API
- [ ] Add authentication of some sort to the API 
