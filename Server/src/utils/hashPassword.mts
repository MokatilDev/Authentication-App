import bcrypt from "bcrypt";

const slatRounds = 10;

const hashPassword = (password: string) => {
    const salt = bcrypt.genSaltSync(slatRounds);
    return bcrypt.hashSync(password, salt);
}

export default hashPassword