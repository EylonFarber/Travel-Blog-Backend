const pool = require('../db');

// --- 1. GET ALL POSTS ---
// This function handles a GET request to retrieve all blog posts.
const getPosts = async (req, res) => {
  try {
    // Use pool.query to execute a simple SQL SELECT statement.
    // This fetches all columns from every row in the 'posts' table.
    const result = await pool.query('SELECT * FROM posts ORDER BY date DESC');

    // Send a JSON response with a 200 OK status.
    // The 'rows' property of the result object contains the data.
    res.status(200).json(result.rows);
  } catch (err) {
    // If an error occurs during the database query, log the error
    // and send a 500 Internal Server Error status.
    console.error('Error fetching posts:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const getPostById = async (req,res) => {try{const postId = req.params.id;
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [postId])
    if (result.rows.length === 0){return res.status(404).json({error: 'Post not found'})}
res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching post:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const createPost = async (req, res) => {
    // The 'try' block starts here, wrapping the code that might fail.
    try {
        const { author, title, content, cover } = req.body;

        // --- SAFETY CHECK: A new step for validation ---
        // This 'if' statement checks if any of the required pieces of data are missing.
        if (!author || !title || !content || !cover) {
            // If something is missing, we send a clear error message back to the user.
            // A 400 status means "Bad Request," which is perfect for this situation.
            return res.status(400).json({ error: 'Missing required post fields.' });
        }

        const result = await pool.query(
            'INSERT INTO posts (author, title, content, cover) VALUES ($1, $2, $3, $4) RETURNING *',
            [author, title, content, cover]
        );

        // If everything worked, we send back the new post data.
        res.status(201).json(result.rows[0]);
    } catch (err) {
        // The 'catch' block is right after 'try' and handles any errors.
        console.error('Error creating post:', err.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
;
