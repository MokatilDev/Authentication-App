import bcrypt from 'bcrypt';

const comparePassword = (plainText:string, password:string) => {
    return  bcrypt.compareSync(plainText,password)
}

export default comparePassword