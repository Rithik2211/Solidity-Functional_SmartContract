const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { assert } = require("chai");
const { ethers, provider } = require("hardhat");

describe("Proxy", function () {
  async function deployFixture() {
    const Proxy = await ethers.getContractFactory("Proxy");
    const proxy = await Proxy.deploy();

    const Logic1 = await ethers.getContractFactory("Logic1");
    const logic1 = await Logic1.deploy();

    const Logic2 = await ethers.getContractFactory("Logic2");
    const logic2 = await Logic2.deploy();

    const proxyAsLogic1 = await ethers.getContractAt("Logic1", proxy);
    const proxyAsLogic2 = await ethers.getContractAt("Logic2", proxy);

    return { proxy , logic1, logic2, proxyAsLogic1, proxyAsLogic2 };
  }

  async function lookUpuint (contractAddress, slot){
    return parseInt(await provider.getStorage(contractAddress, slot));
  }

  it("Should work with Logic1", async function () {
    const { proxy, logic1, proxyAsLogic1 } = await loadFixture(deployFixture);
    await proxy.changeImplementation(logic1);
    assert.equal(await lookUpuint(logic1, '0x0'), 0);

    await proxyAsLogic1.changeX(55);
    assert.equal(await lookUpuint(logic1, '0x0'), 55);
  });

  it("Should work with upgrades", async function () {
    const { proxy , logic1, logic2, proxyAsLogic1, proxyAsLogic2 } = await loadFixture(deployFixture);
    await proxy.changeImplementation(logic1);
    assert.equal(await lookUpuint(logic1, '0x0'), 0);

    await proxyAsLogic1.changeX(55);
    assert.equal(await lookUpuint(logic1, '0x0'), 55);

    await proxy.changeImplementation(logic2);
    assert.equal(await lookUpuint(logic2, '0x0'), 0);

    await proxyAsLogic2.changeX(50);
    assert.equal(await lookUpuint(logic2, '0x0'), 50);

    await proxyAsLogic2.tripleX();
    assert.equal(await lookUpuint(logic2, '0x0'), 150);
  });
});
