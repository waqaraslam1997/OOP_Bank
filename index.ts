#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";

// create a customer class.
class Customer {
    firstName!: string;
    lastName!: string;
    gender!: string;
    age!: number;
    mobileNumber!: number;

    async askQuestion() {
        const ask = await inquirer.prompt([
            {
                type: "input",
                name: "fname",
                message: "Please enter your first name: ",
                validate: (val) => {
                    if (!isNaN(val)) {
                        return `Please enter valid name!`
                    } else {
                        return true;
                    }
                }
            },
            {
                type: "input",
                name: "lname",
                message: "Please enter your last name: ",
                validate: (val) => {
                    if (!isNaN(val)) {
                        return `Please enter valid name!`
                    } else {
                        return true;
                    }
                }
            },
            {
                type: "number",
                name: "age",
                message: "Please enter your age: ",
                validate: (val) => {
                    if (isNaN(val)) {
                        return `Please enter valid age!`
                    } else {
                        return true;
                    }
                }
            },
            {
                type: "list",
                name: "gender",
                message: "Please select your Gender: ",
                choices: ["Male", "Female"],
            },
            {
                type: "number",
                name: "mobileNumber",
                message: "Please enter your mobile no: ",
                validate: (val) => {
                    if (isNaN(val)) {
                        return `Please enter valid number!`
                    } else {
                        return true;
                    }
                },
            },

        ]);

        this.firstName = ask.fname;
        this.lastName = ask.lname;
        this.age = ask.age;
        this.gender = ask.gender;
        this.mobileNumber = ask.mobileNumber;
        this.customerInfo();



    }

    customerInfo() {
        console.log(chalk.yellow(`\n<<==============================>>`));
        console.log(chalk.green(`Your Name: \t${this.firstName.toUpperCase()} ${this.lastName.toUpperCase()}`));
        console.log(chalk.green(`age: \t\t${this.age}`));
        console.log(chalk.green(`Gender: \t${this.gender}`));
        console.log(chalk.green(`Mobile No: \t${this.mobileNumber}`));
        console.log(chalk.yellow(`<<==============================>>\n`));
    }
}

//create interface of BankAccount which is must for Bank Needs.
interface IBankAccount {
    Debit(d: number): string;
    Credit(d: number): string;
}

// creating BankAccount Class with implementing interface.
class BankAccount implements IBankAccount {
    accountBalance!: number;
    constructor() {
        this.bankAccount();
    }
    bankAccount() {
        this.accountBalance = 100;
    }
    get balance() {
        return this.accountBalance;
    }
    Debit(amount: number) {
        let statement: string = chalk.red(`${chalk.bold("Sorry")}, you have insufficient balance!`);

        if (amount > 0) {
            statement = "The Amount you entered is wrong!"

            if (this.accountBalance > amount) {
                this.accountBalance -= amount;
                statement = `${chalk.yellow("Transaction successful!")} ${chalk.green.bold(`\n== Now account balance is ${this.accountBalance} ==`)}`
            } else {
                statement = chalk.red(`${chalk.bold("Sorry")}, You don't have enough money to do this transaction.`);
            }
        }

        return `\n${statement}\n`;
    }

    Credit(amount: number) {
        let statement: string = chalk.red(`Transaction failed!`);

        if (amount > 0) {
            this.accountBalance += amount;

            if (amount > 100) {
                this.accountBalance -= 1;
            }

            statement = chalk.yellow(`Your account has been credited successfully!\n${chalk.green.bold(`== New Balance is ${this.accountBalance} ==`)}`);
        }

        return `\n${statement}\n`;
    }
}

//create user and BankAccount Function.
let user = new BankAccount();
let cust1 = new Customer();

//create setup for program.
const programstart = async (user: BankAccount) => {


    await cust1.askQuestion();
    let resume = true;
    resume: while (resume) {
        const { answer } = await inquirer.prompt([
            {
                name: "answer",
                type: "list",
                choices: ["Debit", "Credit"],
                message: "Please select one. "
            }
        ]);

        if (answer == "Debit") {
            const { amount } = await inquirer.prompt([
                {
                    type: "number",
                    name: "amount",
                    message: "Please enter amount: ",
                    validate: (val) => {
                        if (isNaN(val)) {
                            return `Please enter valid amount!`
                        } else {
                            return true;
                        }
                    }
                }
            ])
            console.log(user.Debit(amount));
        } else if (answer == "Credit") {
            const { amount } = await inquirer.prompt([
                {
                    type: "number",
                    name: "amount",
                    message: "Please enter amount: ",
                    validate: (val) => {
                        if (isNaN(val)) {
                            return `Please enter valid amount!`
                        } else {
                            return true;
                        }
                    },
                }
            ])
            console.log(user.Credit(amount));
            
        }
        let { resume } = await inquirer.prompt({
            type: "confirm",
            message: "Do you want to do more transactions.",
            default: true,
            name: "resume",
        })

        if (resume) {
            resume;
        } else {
            console.log(chalk.yellowBright.bold(`\n<<== Thank you ${cust1.firstName.toUpperCase()} ${cust1.lastName.toUpperCase()}. See you again! ==>>`));
            break;
        }
    }
}
// sarting program.
console.log(chalk.green.bold(`\n${chalk.yellow(`<<===`)} Welcome to the Bank of CRYPTO! ${chalk.yellow(`===>>`)}\n`));

programstart(user)
