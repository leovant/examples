const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {
  let users;

  beforeEach(() => {
    users = new Users();
    users.users = [
      {
        id: '1',
        name: 'Leo',
        room: 'Node Course'
      },
      {
        id: '2',
        name: 'Sana',
        room: 'React Course'
      },
      {
        id: '3',
        name: 'Mercedes',
        room: 'Node Course'
      }
    ];
  });

  it('should add new user', () => {
    let users = new Users();
    let user = {
      id: '123',
      name: 'Leo',
      room: 'Developers'
    };
    let result = users.addUser(user.id, user.name, user.room);

    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    let id = '3';
    let user = users.removeUser(id);

    expect(user.id).toBe(id);
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    let id = '99';
    let user = users.removeUser(id);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    let id = '2';
    let user = users.getUser(id);

    expect(user.id).toBe(id);
  });

  it('should not find user', () => {
    let id = '99';
    let user = users.getUser(id);

    expect(user).toNotExist();
  });

  it('should return names for node course', () => {
    let users_list = users.getUserList('Node Course');

    expect(users_list).toEqual(['Leo', 'Mercedes']);
  });

  it('should return names for react course', () => {
    let users_list = users.getUserList('React Course');

    expect(users_list).toEqual(['Sana']);
  });
});
