const users = [
    {
        username: 'john_doe',
        email: 'john.doe@example.com',
    },
    {
        username: 'jane_smith',
        email: 'jane.smith@example.com',
    },
    {
        username: 'alice_johnson',
        email: 'alice.johnson@example.com',
    },
];

const thoughts = [
    {
        thoughtText: 'I love learning new things!',
        username: 'john_doe',
        reactions: [
            {
                reactionBody: 'That’s great!',
                username: 'jane_smith',
            },
            {
                reactionBody: 'Keep it up!',
                username: 'alice_johnson',
            }
        ]
    },
    {
        thoughtText: 'Mongoose makes working with MongoDB so easy.',
        username: 'jane_smith',
        reactions: [
            {
                reactionBody: 'I agree! It’s awesome!',
                username: 'john_doe',
            }
        ]
    },
    {
        thoughtText: 'Always stay curious!',
        username: 'alice_johnson',
        reactions: [
            {
                reactionBody: 'Absolutely!',
                username: 'john_doe',
            },
            {
                reactionBody: 'Curiosity is key!',
                username: 'jane_smith',
            }
        ]
    },
];

export { users, thoughts };
