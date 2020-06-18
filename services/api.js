 
import axios from 'axios'; 

export const LoginProfileApi= ( FormData) =>{ 
  return new Promise((resolve, reject) => {
      axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/login', FormData)
              .then( (response)=> {   
                  resolve(response.data);
              })
              .catch((err) => {   
                  reject(err.response.data);
                  
              });
            })
          }

          
  

export const RegisterProfileApi= ( FormData) =>{ 
  return new Promise((resolve, reject) => {
  axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/register', FormData)
          .then( (response)=> {   
              resolve(response.data);
          })
          .catch((err) => {   
              reject(err.response.data);
              
          });
        })
      }

export const ResetPasswordApi= ( FormData) =>{ 
  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/reset_password', FormData)
        .then( (response)=> {   
            resolve(response.data);
        })
        .catch((err) => {   
            reject(err.response.data);
            
        });
      })
  }


export const UpdateProfileApi= ( FormData) =>{ 
    return new Promise((resolve, reject) => {
      axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/update_profile', FormData)
        .then(function (response) { 
          resolve(response);
        })
        .catch(function (err) {   
            reject();
        });   

    })
}

export const ChangePasswordApi= ( FormData) =>{ 
  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/change_password', FormData)
      .then(function (response) { 
        resolve();
      })
      .catch(function (err) {   
          reject();
      });   

  })
}

export const DeleteAccountApi= ( FormData) =>{ 
  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/delete_account', FormData)
      .then(function (response) { 
        resolve();
      })
      .catch(function (err) {   
          reject();
      });   

  })
}

export const SearchProfileApi= (FormData) => {
  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/filter_users', FormData)
      .then(function (response) {  
        resolve(response.data);
      })
      .catch(function (err) {   
          reject();
      });    
  })
}
export const AddOrganizationApi= ( FormData) =>{  

  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/add_organization', FormData)
      .then(function (response) {  
        resolve(response.data);
      })
      .catch(function (err) {  
          reject();
      });    
  })
} 

export const AddEducationApi= ( FormData) =>{  
  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/addEducation', FormData)
      .then(function (response) {  
        resolve(response.data);
      })
      .catch(function (err) {  
          reject();
      });    
  })
} 

export const DeleteOrganizationApi= ( FormData) =>{  
  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/delete_organization', FormData)
      .then(function (response) {  
        resolve(response.data);
      })
      .catch(function (err) {  
          reject();
      });    
  })
} 

 
export const DeleteEducationApi= ( FormData) =>{  
  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/delete_education', FormData)
      .then(function (response) {  
        resolve(response.data);
      })
      .catch(function (err) { 
          // setError(err); 
          reject();
      });    
  })
} 



export const profileApi = (bodyFormData) => { 
  
  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/profile', bodyFormData)
      .then(function (response) {    
        resolve(response.data);
      
      })
      .catch(function (err) { 
          
          reject();
      });   

  })
}; 


export const GetLastConversationsApi = (bodyFormData) => { 
  
  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/messages/get_conversation_list', bodyFormData)
      .then(function (response) {    
        resolve(response.data); 
      })
      .catch(function (err) {  
          reject();
      });   

  })
}; 

export const GetChatConversationApi = (bodyFormData) => { 
  
  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/messages/get_chat_conversations_new', bodyFormData)
      .then(function (response) {    
        resolve(response.data); 
      })
      .catch(function (err) {  
          reject();
      });   

  })
}; 

export const GetSayHiApi = (bodyFormData) => { 
  
  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/SayHi_List', bodyFormData)
      .then(function (response) {    
        resolve(response.data);  
      })
      .catch(function (err) {  
          reject();
      });   

  })
};  

export const GetSuperMatchesApi = (bodyFormData) => { 
  
  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/SuperMatch_List', bodyFormData)
      .then(function (response) {    
        resolve(response.data);  
      })
      .catch(function (err) {  
          reject();
      });   

  })
};

export const SendMessageApi = (bodyFormData) => {  
  let config = {
    headers: {
      Connection:  "Keep-Alive",
    }
  }
  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/messages/send_text_message', bodyFormData , { headers:{ Connection:  "Keep-Alive"}})
      .then(function (response) {    
        resolve(response.data); 
      })
      .catch(function (err) { 
          
          reject();
      });   

  })
}; 

export const LogOutApi = () => {  
  let formData = new FormData()
  formData.append('access_token',global.AccesToken); 
  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/logout', formData )
      .then(function (response) {  
        global.AccesToken=""
        global.user_id=""
        global.is_pro=""
        global.avatar=""
        resolve(response.data); 
        
      })
      .catch(function (err) { 
          
          reject();
      });   

  })
}; 

export const registerApi = (bodyFormData) => { 
  console.log("here,me ", bodyFormData) 
    return new Promise((resolve, reject) => {
      axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/register', bodyFormData)
        .then(function (response) {   
          resolve(response.data); 
        })
      })
      .catch(function (err) { 
           
      });    
}; 

export const SuperLikeApi = (bodyFormData) => {  
  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/add_supermatch', bodyFormData)
      .then(function (response) {   
        resolve(response.data); 
      })
    })
    .catch(function (err) { 
         
    });    
};  


export const addlikesApi = (bodyFormData) => {  
  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/add_likes', bodyFormData)
      .then(function (response) {   
        resolve(response.data); 
      })
    })
    .catch(function (err) { 
         
    });    
};

// export const ApiUpdateAvatar = (bodyFormData) => {  
//   console.log('HEy',bodyFormData)
//   return new Promise((resolve, reject) => { 
//     fetch('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/update_avater', bodyFormData
//     ,{ 
//       method: 'POST',
//       headers: {
//         'Content-Type': 'multipart/form-data', 
//         "Connection" :"Keep-Alive", 
//       }
//     },

export const ApiUpdateAvatar = (bodyFormData) => {  
  return new Promise((resolve, reject) => { 
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/update_avater', bodyFormData
    , {
      headers: {
        'Content-Type': 'multipart/form-data',
        "Connection" :"Keep-Alive",  
    //     "otherHeader": "foo",
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
    //     'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type', 
      },  
      }
      ).
    then( response => {   
      return resolve(response); 
      }).
      catch(function (err) {  
          return reject(err);

      });    
     })  
 }

    //
    // ,{ 
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //     // 'Content-Type':'application/x-www-form-urlencoded',
    //     "Connection" :"Keep-Alive",
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS, DELETE',
    //     'Access-Control-Allow-Headers': 'Access-Control-Allow-Methods, Access-Control-Allow-Origin, Origin, Accept, Content-Type',
    //     'Accept': 'application/x-www-form-urlencoded',
    //   }
    // },
    // )
    //   
    // })
    // .catch(function (err) {  
    // });    
// };  


export const CheckSwipeDateApi = (bodyFormData) => {  
  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/fetch_lastSwipeCount', bodyFormData)
      .then(function (response) {   
        resolve(response.data); 
      })
    })
    .catch(function (err) { 
         
    });    
};  

export const RandomusersApi = (bodyFormData) => {  
  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/fetch_random_users', bodyFormData)
      .then(function (response) {    
        resolve(response.data);
      })
      .catch(function (err) { 
          
          reject();
      });   

  })
}; 

export const fetchSwippedMeApi = (bodyFormData) => { 
  
  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/fetch_SwappedMe', bodyFormData)
      .then(function (response) {    
        resolve(response.data);  
      })
      .catch(function (err) { 
          
          reject(err);
      });   

  })
};   

export const fetchSearchApi = (bodyFormData) => { 
  
  return new Promise((resolve, reject) => {
    axios.post('http://app.tech-solt.com/endpoint/v1/27ce3f02d98d388b9021021f74ffe702/users/search', bodyFormData)
      .then(function (response) {    
        resolve(response.data);  
      })
      .catch(function (err) { 
          
          reject(err);
      });   

  })
};  