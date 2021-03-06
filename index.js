const { exec } = require('child_process');
const core = require('@actions/core');
const { context } = require('@actions/github');

const getInputs = () => {
  return {
    paths: core.getInput('paths'),
    version: core.getInput('version'),
  }
}

const fetchRepo = () => {
  return new Promise((resolve, reject) => {
    exec('git fetch -a', (error) => {
      if (error) reject(error);
      resolve();
    });
  });
}

const getRef = (version) => {
  const gitFetchCommand = version && version !== 'none'
    ? `git show-ref --hash --tags ${version}`
    : `git rev-list ${ version === 'none' ? 'HEAD^1' : '--tags' } --max-count=1`;

  return new Promise((resolve, reject) => {
    exec(gitFetchCommand, (error, stdout, stderr) => {
      if (error) reject(error);
      resolve(stdout);
    });
  });
}

const getDiffs = (ref, paths) => {
  return new Promise((resolve, reject) => {
    exec(`git diff --name-only ${ref} ${paths}`, (error, stdout, stderr) => {
      if (error) reject(error);
      // Check if stdout is not null or empty?
      console.log(`stdout: ${stdout}`);
    });
  });
}

(async () => {
  try {
    const {
      paths,
      version,
    } = getInputs();

    console.log('Fetching ref...');

    const ref = await getRef(version);

    console.log('Ref:', ref);

    console.log('Checking files changed...');

    const filesChanged = await getDiffs(ref, paths);

    console.log('Files Changed:', filesChanged);

    const output = filesChanged ? 'True' : 'False';
    core.setOutput('change', output);
  } catch (err) {
    core.setFailed(err);
  }
})();
