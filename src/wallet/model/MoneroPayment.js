const assert = require("assert");
const MoneroUtils = require("../../utils/MoneroUtils");

/**
 * Represents a payment on the Monero network to an address.
 * 
 * A transaction may have one or more payments.
 */
class MoneroPayment {
  
  /**
   * Constructs the model.
   * 
   * @param json is existing JSON to construct the model from (optional)
   */
  constructor(jsonOrAddress, amount) {
    if (typeof jsonOrAddress === "string") {
      this.json = {};
      this.setAddress(jsonOrAddress);
      this.setAmount(amount);
    } else {
      this.json = Object.assign({}, jsonOrAddress);
    }
  }
  
  getAddress() {
    return this.json.address;
  }

  setAddress(address) {
    this.json.address = address;
  }

  getAccountIndex() {
    return this.json.accountIndex;
  }

  setAccountIndex(accountIndex) {
    this.json.accountIndex = accountIndex;
  }

  getSubaddressIndex() {
    return this.json.subaddressIndex;
  }

  setSubaddressIndex(subaddressIndex) {
    this.json.subaddressIndex = subaddressIndex;
  }

  getAmount() {
    return this.json.amount;
  }

  setAmount(amount) {
    this.json.amount = amount;
  }
  
  getOutputs() {
    return this.json.outputs;
  }
  
  setOutputs(outputs) {
    this.json.outputs = outputs;
  }

  /**
   * Merges the given payment into this payment.
   * 
   * Sets uninitialized fields to the given payent. Validates initialized fields are equal.
   * 
   * @param payment is the payment to merge into this one
   */
  merge(payment) {
    this.setAddress(MoneroUtils.reconcile(this.getAddress(), payment.getAddress()));
    this.setAccountIndex(MoneroUtils.reconcile(this.getAccountIndex(), payment.getAccountIndex()));
    this.setSubaddressIndex(MoneroUtils.reconcile(this.getSubaddressIndex(), payment.getSubaddressIndex()));
    this.setAmount(MoneroUtils.reconcile(this.getAmount(), payment.getAmount()));
    
    // merge outputs
    if (this.getOutputs() === undefined) this.setOutputs(payment.getOutputs());
    else if (payment.getOutputs()) {
      for (let newOutput of payment.getOutputs()) {
        let merged = false;
        for (let oldOutput of this.getOutputs()) {
          if (oldOutput.getKeyImage() === newOutput.getKeyImage()) {
            oldOutput.merge(newOutput);
            merged = true;
            break;
          }
        }
        if (!merged) this.getOutputs().push(merged);
      }
    }
  }
  
  toString(indent = 0) {
    let str = "";
    str += MoneroUtils.kvLine("Address", this.getAddress(), indent);
    str += MoneroUtils.kvLine("Account index", this.getAccountIndex(), indent);
    str += MoneroUtils.kvLine("Subaddress index", this.getSubaddressIndex(), indent);
    str += MoneroUtils.kvLine("Amount", this.getAmount() ? this.getAmount().toString() : undefined, indent);
    if (this.getOutputs()) {
      str += MoneroUtils.kvLine("Outputs", "", indent);
      for (let i = 0; i < this.getOutputs().length; i++) {
        str += MoneroUtils.kvLine(i + 1, "", indent + 1);
        str += this.getOutputs()[i].toString(indent + 2);
        str += '\n'
      }
    } else {
      str += MoneroUtils.kvLine("Outputs", this.getOutputs(), indent);
    }
    return str.slice(0, str.length - 1);  // strip last newline
  }
}

module.exports = MoneroPayment;