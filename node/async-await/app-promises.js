const users = [
  { id: 1, name: 'Leo', school_id: 101 },
  { id: 2, name: 'Andrew', school_id: 999 }
];
const grades = [
  { id: 1, school_id: 101, grade: 86 },
  { id: 2, school_id: 999, grade: 91 },
  { id: 3, school_id: 101, grade: 96 },
  { id: 4, school_id: 999, grade: 76 }
];

const getUser = id => {
  return new Promise((resolve, reject) => {
    const user = users.find(user => user.id === id);

    if (user) {
      resolve(user);
    } else {
      reject(`Unable to find user with id of ${id}.`);
    }
  });
};

const getGrades = school_id => {
  return new Promise((resolve, reject) => {
    resolve(grades.filter(grade => grade.school_id === school_id));
  });
};

const getStatus = id => {
  let user;

  return getUser(id)
    .then(_user => {
      user = _user;
      return getGrades(_user.school_id);
    })
    .then(grades => {
      let average = 0;

      if (grades.length > 0) {
        average =
          grades.map(grade => grade.grade).reduce((a, b) => a + b) /
          grades.length;
      }
      return `${user.name} has a ${average}% in the class.`;
    });
};

const getStatusAlt = async id => {
  const user = await getUser(id);
  const grades = await getGrades(user.school_id);
  let average = 0;

  if (grades.length > 0) {
    average =
      grades.map(grade => grade.grade).reduce((a, b) => a + b) / grades.length;
  }
  return `${user.name} has a ${average}% in the class.`;
};

getStatusAlt(2)
  .then(status => {
    console.log(status);
  })
  .catch(e => {
    console.error(e);
  });

getUser(2)
  .then(user => {
    console.log(user);
  })
  .catch(e => {
    console.log(e);
  });

getGrades(101).then(grades => {
  console.log(grades);
});

getStatus(1).then(status => {
  console.log(status);
});
