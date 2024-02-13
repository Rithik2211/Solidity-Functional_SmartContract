const { loadFixture } = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { assert } = require("chai");

describe("Proxy", function () {
  async function deployFixture() {
    const Proxy = await ethers.getContractFactory("Proxy");
    const proxy = await Proxy.deploy();

    const Logic1 = await ethers.getContractFactory("Logic1");
    const logic1 = await Logic1.deploy();

    const Logic2 = await ethers.getContractFactory("Logic2");
    const logic2 = await Logic2.deploy();

    return { proxy , logic1, logic2 };
  }
  it("Should work with Logic1", async function () {
    const { proxy , logic1 } = await loadFixture(deployFixture);
    await proxy.changeImplementation(logic1);
    assert.equal(await logic1.x(), 0);

    await proxy.changeX(55);
    assert.equal(await logic1.x(), 55);
  });

  // it("Should work with upgrades", async function () {
  //   const { proxy , logic1, logic2 } = await loadFixture(deployFixture);
  //   await proxy.changeImplementation(logic1);
  //   assert.equal(await logic1.x(), 0);

  //   await proxy.changeX(55);
  //   assert.equal(await logic1.x(), 55);

  //   await proxy.changeImplementation(logic2);
  //   assert.equal(await logic2.x(), 0);

  //   await proxy.changeX(50);
  //   assert.equal(await logic2.x(), 50);

  //   await proxy.tripleX();
  //   assert.equal(await logic2.x(), 150);
  // });
});
