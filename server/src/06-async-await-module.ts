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

async function fetchUsers(): Promise<User[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(users);
    }, 1000);
  });
}

async function main() {
  const users = await fetchUsers();
  console.log(users);
}

main();
