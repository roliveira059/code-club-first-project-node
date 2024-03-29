const express = require('express')
const uuid = require('uuid')
const port = 3000

const app = express()
app.use(express.json())

// app.get('/users', (request, response) => {
//     const { name, age, city } = request.query

//     return response.json({name, age, city})
// })

// app.get('/users/:id', (request, response) => {
//     const { id } = request.params

//     return response.json({id})
// })

// app.get('/users', (request, response) => {
    
//     const { name, age } = request.body

//     return response.json({ name, age })
// })

const users = []

const checkUserId = (request, response, next) => {
    const { id } = request.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({ error: "User not found"})
    }

    request.userIndex = index
    request.userId = id

    next()
}


app.get('/users', (request, response) => {
    return response.json(users)
})

app.post('/users', (request, response) => {
    try {
        const { name, age } = request.body;
        const user = { id: uuid.v4(), name, age }
    
        if(age < 18) throw new Error("Only Allowed users over 18 years old")
        users.push(userR);
    
        return response.status(201).json(user);        
    } catch (error) {
        return response.status(400).json({error:error.message});
    } finally {
        console.log("Terminou tudo")
    }

})

app.put('/users/:id', checkUserId, (request, response) => {
    const { name, age } = request.body
    const index = request.userIndex
    const { id } = request.params
    
    const updateUser = { id, name, age}

    users[index] = updateUser

    return response.json(updateUser)
})

app.delete('/users/:id', checkUserId, (request, response) => {

    const index = request.userIndex

    users.splice(index, 1)

    return response.status(204).json()
})

app.listen(3000, () => {
    console.log(`🚀 Server started on port ${port}`)
})

