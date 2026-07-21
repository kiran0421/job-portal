type User = {
  id: number;
  name: string;
  role: "user" | "admin";
  email: string;
};

const users: User[] = [
  { id: 1, name: "Alice", role: "user", email: "tHj0m@example.com" },
  { id: 2, name: "Bob", role: "admin", email: "L2k3D@example.com" },
  { id: 3, name: "Charlie", role: "user", email: "y0r9o@example.com" },
];

function fetchUserWithPromise (userId: number ) : Promise <User>{
    return new Promise((resolve, reject) =>{
        setTimeout(()=>{
            const user = users.find(u => u.id === userId);
            if(!user){
                reject (new Error(`user with ${userId} not found`));
            }else{
                resolve(user)
            }
        }, 1000)
    })
}

fetchUserWithPromise(1)
    .then((user) => {
    console.log(`userdatails:` + JSON.stringify(user))
    })
    .catch((error)=>{
        console.log(`error: ${error.message}`)
    })