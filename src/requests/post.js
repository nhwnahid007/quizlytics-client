
export const postNewUser = async (newUser) => {
  const response = await fetch('http://localhost:5000/registered_users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(newUser) 
  });
  return response;
}

export const postUserWithProvider = async (newUser) => {
  const response = await fetch('http://localhost:5000/authenticating_with_providers', {
    method: "POST", 
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newUser)
  })
  return response;
}

