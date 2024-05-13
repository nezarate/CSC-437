export interface Credential {
    username: string;
    hashedPassword: string;
  }

//   curl --request POST --header "Content-Type: application/json" --data '{"username":"peekoboo","password":"goodnightdog5"}' http://localhost:3000/api/register