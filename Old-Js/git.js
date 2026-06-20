

function Git(name){
    this.name = name;
    this.lastCommitId = -1;
    this.HEAD = null;
    this.commitHistory = [];
}

function Commit(id, message, parent){
    this.id = id;
    this.message = message;
    this.parent = parent;
}

Git.prototype.commit = function(message){
    var commit = new Commit(++this.lastCommitId,message, this.HEAD);
    this.commitHistory.push(commit);
    this.HEAD = commit;
    return commit;
}

Git.prototype.log = function(){
    let currentCommit = this.HEAD;
    let history = [];
    while(currentCommit!=null){
        const commitLog = ` 
         ID: ${currentCommit.id}
         Message: ${currentCommit.message}
         --------------------------------------
        `;
        console.log(commitLog);
        history.push(currentCommit);
        currentCommit = currentCommit.parent;
    }
    return history;
}







// Testing part 
	console.log('1. Git.log() test');
	var repo = new Git('test');
	repo.commit('Initial commit');
	repo.commit('Change 1');

	var log = repo.log();
	console.assert(log.length === 2); // Should have 2 commits.
	console.assert(!!log[0] && log[0].id === 1); // Commit 1 should be first.
	console.assert(!!log[1] && log[1].id === 0); // And then Commit 0.

	// console.log('2. Git.checkout() test')
	// var repo = new Git('test');
	// repo.commit('Initial commit');

	// console.assert(repo.HEAD.name === 'master'); // Should be on master branch.
	// repo.checkout('testing');
	// console.assert(repo.HEAD.name === 'testing'); // Should be on new testing branch.
	// repo.checkout('master');
	// console.assert(repo.HEAD.name === 'master'); // Should be on master branch.
	// repo.checkout('testing');
	// console.assert(repo.HEAD.name === 'testing'); // Should be on testing branch again.

	// console.log('3. Branches test');
	// var repo = new Git('test');
	// repo.commit('Initial commit');
	// repo.commit('Change 1');

	// // Maps the array of commits into a string of commit ids.
	// // For [C2, C1,C3], it returns "2-1-0"
	// function historyToIdMapper (history) {
	// 	var ids = history.map(function (commit) {
	// 		return commit.id;
	// 	});
	// 	return ids.join('-');
	// }

	// console.assert(historyToIdMapper(repo.log()) === '1-0'); // Should show 2 commits.

	// repo.checkout('testing');
	// repo.commit('Change 2');

	// console.assert(historyToIdMapper(repo.log()) === '2-1-0'); // Should show 3 commits.

	// repo.checkout('master');
	// console.assert(historyToIdMapper(repo.log()) === '1-0'); // Should show 2 commits. Master unpolluted.

	// repo.commit('Change 3');
	// console.assert(historyToIdMapper(repo.log()) === '3-1-0'); // Continue on master with 4th commit.