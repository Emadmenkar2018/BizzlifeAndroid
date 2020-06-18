
export const emailValidator = email => {
    const re = /\S+@\S+\.\S+/;
  
    if (!email || email.length <= 0) return 'Email cannot be empty.';
    if (!re.test(email)) return 'Ooops! We need a valid email address.';
  
    return '';
  };
  
  export const passwordValidator = password => {
    if (!password || password.length <= 0) return 'Password cannot be empty.';
  
    return '';
  };
  
  export const nameValidator = name => {
    if (!name || name.length <= 0) return 'Name cannot be empty.';
  
    return '';
  };

  export const completetionValidator = profile => { 
    let precentage = 5;
    if (profile.avater){
      precentage = precentage+10
    }
    if (profile.worktitle_text){
      precentage = precentage+7
    }
    if (profile.interestings_text){
      precentage =  precentage+ 8 
    }
    if (profile.goals_text){
      precentage =  precentage+ 7 
    }
    if (profile.bio_text){
      precentage =  precentage+ 7 
    }
    if (profile.meeting_text){
      precentage =  precentage+ 7 
    }
    if (profile.experience_text){
      precentage =  precentage+ 7 
    }
    if (profile.industry_text){
      precentage =  precentage+ 7 
    }
    if (profile.academic_text){
      precentage =  precentage+ 3
    }
    if (profile.experience_text){
      precentage =  precentage+ 3 
    }
    if (profile.organizations.length > 0){
      precentage =  precentage+ 8
    }
    if (profile.educations.length > 0){
      precentage =  precentage+ 8 
    } 
    return precentage;
  }
  