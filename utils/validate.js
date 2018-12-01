const Validate = class Validate {
  constructor() {
    this.validators = {
      password: {
        regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&]{6,10}',
        msg: ('Invalide password: Minimum 6 and maximum 10 characters, at least one uppercase letter, one lowercase letter, one number and one special character:'),
      },
      username: {
        regex: '.{2,80}',
        msg: ('The username must contain between 2 and 80 characters'),
      },
    };
  }

  get(key) {
    /* return {
      ...this.validators[key],
      args: new RegExp(this.validators[key].regex),
    }; */
    return this.validators[key];
  }
};

module.exports = Validate;
