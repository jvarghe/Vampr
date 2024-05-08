/* VAMPR
 *
 * As you obviously know, all vampires are obsessed with lineage.
 *
 *   * "Who turned me into a vampire?"
 *   * "Who turned that vampire into a vampire?"
 *   * "How many descendants of the original vampire am I?"
 *   * These are the most important questions for vampires.
 *
 * When two vampires interact, their lineage is of the most supreme importance.
 * Is this vampire my elder? Junior? A direct ancestor or descendent of mine?
 * These are unlife or undeath questions for Vampires.
 *
 * You've been hired by vampires to build an app called Vampr. This app will
 * be able to quickly determine a vampire's lineage relative to any other
 * vampire. This app will need to be able to answer the following questions:
 *
 *   * Who is a vampire's creator?
 *   * How many vampires has a vampire created?
 *   * How many vampires away from the original vampire is a vampire?
 *
 *   * Who is the more senior vampire out of two vampires? (Who is closer
 *     to the original vampire)
 *
 *   * Who is the closest common ancestor of two vampires?
 *
 *   * Vampr needs to store and organize all the vampires in a way that makes
 *     it easy to answer these questions. You may have noticed that there are
 *     aspects of our previous "Org Chart" exercise that we can use in the
 *     development of Vampr.
 *
 *   * Count the total number of descendents that a vampire has.
 *
 *   * Search for a descendant of a vampire with a specific name.
 *
 *   * Get a list of all the of millennial descendents that a vampire has
 *     (vampires that were converted after 1980)
 *
 * The vampire's lineage is best represented by a tree structure:
 *
 *
 *                                Original
 *                              /    |   \
 *                          Ansel   Bart  ...
 *                          /   \
 *                      Elgort Sarah
 *                         |
 *                      Andrew
 *
 *
 * This is the current tree we have of all the vampires. You will need to store
 * this tree in code and create methods to implement all of the requirements.
 *
 *
 * STATUS
 *
 * This implementation passes 16/17 tests. It fails the last test for
 * the `closestCommonAncestor()` method.
 *
 */


// THE VAMPIRE CLASS
class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }


  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    vampire.creator = this;
    this.offspring.push(vampire);
    return vampire;
  }


  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }


  // Returns the number of vampires away from the original vampire this vampire
  // is
  get numberOfVampiresFromOriginal() {

    let numberOfVampiresFromOriginal = 0;
    let currentVampire = this;

    while (currentVampire.creator !== null) {
      currentVampire = currentVampire.creator;
      numberOfVampiresFromOriginal++;
    }

    return numberOfVampiresFromOriginal;
  }


  // Returns true if this vampire is more senior than the other vampire. (Who
  // is closer to the original vampire)
  isMoreSeniorThan(vampire) {

    const currentVampiresDistanceFromOriginal = this.numberOfVampiresFromOriginal;
    const otherVampiresDistanceFromOriginal = vampire.numberOfVampiresFromOriginal;


    // Check if the two vampires are siblings...
    if ((currentVampiresDistanceFromOriginal === otherVampiresDistanceFromOriginal)) {

      // If so, check if the current vampire is older than the other.
      if (this.yearConverted < vampire.yearConverted) {
        return true;
      } else {
        return false;
      }

    }

    // If the vampires have different ages, check if the current vampire is
    // older than the other.
    if ((currentVampiresDistanceFromOriginal < otherVampiresDistanceFromOriginal)) {
      return true;
    } else {
      return false;
    }

  }


  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct
  // ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common ancestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common ancestor.
  closestCommonAncestor(vampire) {

    let juniorVampire;
    let seniorVampire;
    let directDescendent = false;


    // Corner Cases:
    // If the two vampires are the same, return the vampire object.
    if (this.name === vampire.name) {
      return this;
    }


    // Determine the senior vampire.
    if (this.isMoreSeniorThan(vampire) === true) {
      seniorVampire = this;
      juniorVampire = vampire;
    } else {
      seniorVampire = vampire;
      juniorVampire = this;
    }


    // Check if current vampire is the ancestor of the other vampire.
    let currentVampire = juniorVampire;

    while (currentVampire.creator !== null) {

      currentVampire = currentVampire.creator;

      if (seniorVampire.name === currentVampire.name) {
        directDescendent = true;
      }

    }


    // If the two vampires are NOT directly related...
    if (directDescendent !== true) {
      return seniorVampire.creator;

      // If the two vampires are ancestor-descendent...
    } else {
      return seniorVampire;
    }

  }


  // Searches for a descendant with the given name. Returns the vampire object
  // with that name, or `null` if no vampire exists with that name.
  vampireWithName(vampireName) {

    // Check if the given name is the same as the current vampire. If so, return
    // the current vampire.
    if (this.name === vampireName) {
      return this;
    }

    // If the given name is a different vampire, iterate over its offspring
    //  array; search to see if there is a descendant with the given name.
    for (let child of this.offspring) {

      // Recursive Case: Recursively call this method on each child.
      let descendantVampire = child.vampireWithName(vampireName);

      // If a descendant was found and stored in `vampire`, return it.
      if (descendantVampire) {
        return descendantVampire;
      }

    }

    // Base Case: If nothing is found, return `null`.
    return null;

  }


  // Returns the total number of descendants that this vampire has. Note: the
  // function name is misspelled, but it is left like that because the test
  // uses that name.
  get totalDescendents() {

    // Problem: Making `descendantCount` = 1 or appending 1 to the return value
    // of this method causes the test to fail. The return value will be off by
    // one. It's not clear why adding one within the for-loop returns the
    // correct value.
    let descendantCount = 0;

    for (let child of this.offspring) {

      // Recursive Case: Recursively call this method on each child.
      descendantCount += child.totalDescendents + 1;

    }

    return descendantCount;

  }


  // Returns an array of all the vampires that were converted after 1980.
  get allMillennialVampires() {

    let millennialVampires = [];

    // Check if the current vampire is a millennial. If so, add it to the list.
    if (this.yearConverted > 1980) {
      millennialVampires.push(this);
    }


    // Recursive Case: Recursively call this method on each child vampire.
    for (let child of this.offspring) {
      millennialVampires = millennialVampires.concat(child.allMillennialVampires);
    }

    // Base Case: If nothing is found, do nothing.

    return millennialVampires;


  }

}


// CREATE VAMPIRE OBJECTS

// Vampires
// Root Node
const originalVampire = new Vampire("Original", 1957);

// Second Tree Layer
const ansel = new Vampire("Ansel", 1975);
const bart = new Vampire("Bart", 1977);

// Third Tree Layer
const elgort = new Vampire("Elgort", 1984);
const sarah = new Vampire("Sarah", 1985);

// Fourth Tree Layer
const andrew = new Vampire("Andrew", 1993);


// POPULATE THE TREE

// Link the second layer to the root node.
originalVampire.addOffspring(ansel);
originalVampire.addOffspring(bart);

// Link the third layer to the second layer.
ansel.addOffspring(elgort);
ansel.addOffspring(sarah);

// Link the fourth layer to the third layer.
elgort.addOffspring(andrew);



// DRIVER CODE

// console.log(originalVampire.addOffspring(ansel));
// console.log(ansel.numberOfOffspring);
// console.log(elgort.numberOfVampiresFromOriginal);

// console.log(sarah.isMoreSeniorThan(andrew));
// console.log(originalVampire.isMoreSeniorThan(andrew));
// console.log(andrew.closestCommonAncestor(sarah));

// console.log(ansel.vampireWithName("Andrew"));

// console.log(originalVampire.totalDescendents);

// console.log(originalVampire.allMillennialVampires);


module.exports = Vampire;

