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

  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {

  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {

  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {

  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  closestCommonAncestor(vampire) {

  }
}

module.exports = Vampire;

