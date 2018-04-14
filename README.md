# Blockchain for Certificate

# API end point

## Front end (/)
The visualize page

## GET /blocks
Get all the blocks

## POST /mine
Send in transactions

JSON format:
```ts
 {
    address: string;
    avatar: string;
    category: string;
    country: string;
    date: number;
    documents: {
        ideaku: {
            _id: string;
            hash: string;
            certificate: number;
            payment: string;
            receipt: number;
        };
    };
    latitude: number;
    lngitude: number;
    media: string;
    media_name: string;
    name: string;
    isPrivate: boolean;
    title: string;
}
```

## POST /data

Find a certain data with name (string)

```json
{"name": "Adam"}
```

# LICENSE
MIT