import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getRepos } from '../../actions/profile';
const ProfileGitHub = ({ githubuser, getRepos, repos }) => {
  useEffect(() => {
    getRepos(githubuser);
  }, [getRepos, githubuser]);
  return (
    <div className='profile-github'>
      <h2 className='text-primary my-1'>
        <i className='fab fa-github'></i> Github Repos
      </h2>
      {repos === null ? (
        <h4>No repo created in the github</h4>
      ) : (
        <Fragment>
          {repos.map((repo, index) => (
            <div key={repo._id} className='repo bg-white p-1 my-1'>
              <div>
                <h4>
                  <a
                    href={repo.html_url}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.description}</p>
              </div>
              <div>
                <ul>
                  <li className='badge badge-primary'>
                    Stars: {repo.stargazers_count}
                  </li>
                  <li className='badge badge-dark'>
                    Watchers: {repo.watchers}
                  </li>
                  <li className='badge badge-light'>Forks: {repo.forks}</li>
                </ul>
              </div>
            </div>
          ))}
        </Fragment>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  repos: state.profile.repo,
});
export default connect(mapStateToProps, { getRepos })(ProfileGitHub);
