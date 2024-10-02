
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

export const postUserExamData = async (userExamData) => {
  const response = await fetch("http://localhost:5000/user_exam_data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userExamData)
  })
  return response;
}

export const postOnlyMark = async (userMark) => {
  const response = await fetch("http://localhost:5000/only_user_mark", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userMark)
  })
  return response;
}


// export const postNewUser = async (newUser) => {
//   const axiosPublic = getAxiosPublic(); // Retrieve the axios instance
//   try {
//     const res = await axiosPublic.post('/registered_users', newUser);
//     return res;
//   } catch (error) {
//     console.error('Error when posting user data by credential', error);
//   }
// }

// export const postUserWithProvider = async (newUser) => {
//   const axiosPublic = getAxiosPublic();
//   try {
//     const res = await axiosPublic.post('/authenticating_with_providers', newUser);
//     return res;
//   } catch (error) {
//     console.error('Error when posting user data by provider', error);
//   }
// }

// export const postUserExamData = async (userExamData) => {
//   const axiosPublic = getAxiosPublic();
//   try {
//     const res = await axiosPublic.post('/user_exam_data', userExamData);
//     return res;
//   } catch (error) {
//     console.error('Error when posting user exam data', error);
//   }
// }
