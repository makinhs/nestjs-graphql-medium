# nestjs-graphql-medium

Source code for my [Medium Article](https://makinhs.medium.com/an-introduction-to-apollo-federation-in-nestjs-e513327c1f9c)

## to run

Run the classical npm install then:

- npm run start-all

All the three projects will start and you can open [http://localhost:3330/graphql](http://localhost:3330/graphql) to play around

## mutation to login

```
mutation{
  login(loginInput:{username:"foo", password:"bar"}){
    accessToken
  }
}
```

get the access token and use the next mutation 

```
mutation{
  createTask(createTaskInput:{exampleField:1}){
    exampleField
  }
}
```

with the Http Header:
```
{
  "Authorization":"Bearer YOUR_LOGGED_TOKEN_HERE"
}
```

Cheers
