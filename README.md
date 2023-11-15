# Websocket Coding Challenge Test App

## Subscribe to Floor price updates
Connect to the WS server:

wss://websocket-floor-test-732ef4f89e9d.herokuapp.com

Subscribe to collection:
```
{
  "type": "register",
  "collection": "COLLECTION_SLUG_HERE"
}
```

### Receiving updates
Updates will be pushed through the socket randomly in the format.
```
{
  "collection": "COLLECTION_SLUG_HERE",
  "price_eth": 7.14
}
```

### Trying it out
You can try it out here:
https://www.piesocket.com/websocket-tester

