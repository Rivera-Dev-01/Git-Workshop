// Command information database
const commandInfo = {
    init: {
        title: 'git init',
        description: 'Initializes a new Git repository in the current directory. This creates a hidden .git folder that tracks all changes.',
        example: '$ git init\nInitialized empty Git repository in /path/to/project/.git/'
    },
    add: {
        title: 'git add',
        description: 'Stages changes for the next commit. You can add specific files or all changes at once.',
        example: '$ git add filename.txt\n$ git add .\n$ git add -A'
    },
    commit: {
        title: 'git commit',
        description: 'Saves staged changes to the repository with a descriptive message.',
        example: '$ git commit -m "Add new feature"\n[main 1a2b3c4] Add new feature\n 1 file changed, 10 insertions(+)'
    },
    status: {
        title: 'git status',
        description: 'Shows the current state of your working directory and staging area.',
        example: '$ git status\nOn branch main\nChanges not staged for commit:\n  modified: index.html'
    },
    push: {
        title: 'git push',
        description: 'Uploads your local commits to a remote repository (like GitHub).',
        example: '$ git push origin main\nCounting objects: 5, done.\nWriting objects: 100% (5/5), 450 bytes | 450.00 KiB/s, done.'
    },
    pull: {
        title: 'git pull',
        description: 'Downloads changes from a remote repository and merges them into your current branch.',
        example: '$ git pull origin main\nUpdating 1a2b3c4..5d6e7f8\nFast-forward\n index.html | 5 +++--\n 1 file changed, 3 insertions(+), 2 deletions(-)'
    }
};

// Demo simulation state
let demoState = {
    staged: false,
    committed: false,
    pushed: false
};

function showCommandInfo(command) {
    const info = commandInfo[command];
    document.getElementById('modal-title').textContent = info.title;
    document.getElementById('modal-description').textContent = info.description;
    document.getElementById('modal-example').textContent = info.example;
    document.getElementById('modal').style.display = 'block';
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
}

function addOutput(message, type = 'success') {
    const output = document.getElementById('output');
    const timestamp = new Date().toLocaleTimeString();
    const color = type === 'success' ? '#48bb78' : type === 'warning' ? '#f6ad55' : '#fc8181';
    output.innerHTML += `<div style="color: ${color}; margin-bottom: 8px;">[${timestamp}] ${message}</div>`;
    output.scrollTop = output.scrollHeight;
}

function simulateAdd() {
    if (demoState.staged) {
        addOutput('Files already staged!', 'warning');
        return;
    }
    
    addOutput('$ git add .', 'info');
    setTimeout(() => {
        addOutput('✓ Changes staged successfully!');
        demoState.staged = true;
    }, 500);
}

function simulateCommit() {
    if (!demoState.staged) {
        addOutput('✗ Error: No changes staged. Run git add first!', 'error');
        return;
    }
    
    if (demoState.committed) {
        addOutput('Already committed! Make new changes first.', 'warning');
        return;
    }
    
    addOutput('$ git commit -m "Update workshop files"', 'info');
    setTimeout(() => {
        addOutput('✓ [main a1b2c3d] Update workshop files');
        addOutput('  3 files changed, 45 insertions(+)');
        demoState.committed = true;
    }, 800);
}

function simulatePush() {
    if (!demoState.committed) {
        addOutput('✗ Error: Nothing to push. Commit changes first!', 'error');
        return;
    }
    
    if (demoState.pushed) {
        addOutput('Already pushed! Make new commits first.', 'warning');
        return;
    }
    
    addOutput('$ git push origin main', 'info');
    setTimeout(() => {
        addOutput('Enumerating objects: 5, done.');
        addOutput('Counting objects: 100% (5/5), done.');
        addOutput('Writing objects: 100% (3/3), 1.2 KiB | 1.2 MiB/s, done.');
        addOutput('✓ Successfully pushed to remote repository!');
        demoState.pushed = true;
    }, 1200);
}

function resetDemo() {
    demoState = {
        staged: false,
        committed: false,
        pushed: false
    };
    document.getElementById('output').innerHTML = '<div style="color: #a0aec0;">Ready to simulate Git commands...</div>';
    addOutput('Demo reset. Try the commands again!', 'info');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        closeModal();
    }
}

// Initialize output area
document.addEventListener('DOMContentLoaded', () => {
    resetDemo();
});
