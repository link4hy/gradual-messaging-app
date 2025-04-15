# Run



## FE
npm start


## BE
npm start


## Apollo

https://studio.apollographql.com/sandbox/explorer

```
query GetMessages {
  messages {
    id
    text
    userId
    to
    createdAt
    quotedMessageId
    mentionedUserIds
  }
}
```

```
mutation SendMessage {
  sendMessage(
    text: "Hi Scott!!!!",
    userId: "Elon",
    to: "Scott",
    quotedMessageId: "",  # Optional: provide a valid ID string if available, otherwise leave empty
    mentionedUserIds: []  # Optional: provide an array of user IDs if needed
  ) {
    id
    text
    userId
    to
    createdAt
    quotedMessageId
    mentionedUserIds
  }
}
```