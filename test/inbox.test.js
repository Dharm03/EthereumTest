const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;


beforeEach(async () => {
// get the list of all accounts on ganache
accounts = await web3.eth.getAccounts();

// contract deployment
inbox = await new web3.eth.Contract(JSON.parse(interface))
.deploy({data: bytecode, arguments: ['Hi there!'] })
.send({ from: accounts[1], gas: '1000000' });

});

describe('inbox', () =>{
  it('deployes a contract', () =>{
    assert.ok(inbox.options.address);
//console.log(inbox);
  });
  it('Default message' , async() => {
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hi there!');
  });
  });
