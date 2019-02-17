import gql from 'graphql-tag';


export const FETCH_POSTS_REACHES_MUTATION = gql`
mutation fetchPostsReaches($token: String!, $ownerId: String!, fromTime: $Date!, toTime: $Date!) {
    fetchPostsReaches(token: $token, ownerId: $ownerId, fromTime: $fromTime, toTime: $toTime) {
        postId
        reachTotal
    }
}
`;

export const GET_GROUPS_BY_ID = gql`
	query myGroups($vkId: String!) {
		myGroups(vkId: $vkId) {
			groupId
			groupTItle
		}
	}
`;


export const FETCH_POST_REACHES = gql`
    query postReaches($groupId: String!) {
        postReaches(groupId: $groupId) {
            postId
            reachTotal
        }
    }

`;

export const DELETE_POST_REACHES_MUTATION = gql`
    mutation deletePostsWithReaches($token: String!, $ownerId: String!, $min: Int!, $max: Int!) {
        deletePostsWithReaches(token: $token, ownerId: $ownerId, min: $min, max: $max ) {
            postId
            reachTotal
        }
    }

`;

