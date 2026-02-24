import Comment from "../model/commentschema.js";
import Like from "../model/likeschema.js";

export const getdeta = async (req, res) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&regionCode=IN&maxResults=10&key=${process.env.API_KEY}`,
    );

    const data = await response.json();
    res.status(200).json(data.items);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching videos" });
  }
};

export const getvedio = async (req, res) => {
  try {
    const videoId = req.params.id;

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${process.env.API_KEY}`,
    );

    const data = await response.json();

    res.status(200).json({
      ok: true,
      vedio: data.items[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching video" });
  }
};

export const getchannel = async (req, res) => {
  try {
    const channelId = req.params.id;

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${process.env.API_KEY}`,
    );

    const data = await response.json();

    if (!data.items || data.items.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Channel not found",
      });
    }

    res.status(200).json({
      ok: true,
      channel: data.items[0],
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      message: "Error fetching channel",
    });
  }
};

export const serachdeta = async (req, res) => {
  try {
    const searchText = req.query.q;

    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchText}&maxResults=10&key=${process.env.API_KEY}`,
    );

    const data = await response.json();
    res.status(200).json(data.items);
  } catch (error) {
    res.status(500).json({ message: "Search failed" });
  }
};

export const comment = async (req, res) => {
  try {
    const vedioid = req.params.id;

    const newComment = await Comment.create({
      text: req.body.text,
      comment_user_id: req.user?._id,
      vedio_id: vedioid,
    });

    res.status(200).json({
      ok: true,
      message: "Comment added",
      yourcomment: newComment,
    });
  } catch (error) {
    res.status(500).json({ message: "Comment failed" });
  }
};

export const getcomment = async (req, res) => {
  try {
    const vedioid = req.params.id;

    const comments = await Comment.find({ vedio_id: vedioid })
      .populate("comment_user_id")
      .sort({ createdAt: -1 });

    const ytResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${vedioid}&maxResults=20&key=${process.env.API_KEY}`,
    );

    const ytData = await ytResponse.json();

    res.status(200).json({
      localcomment: comments,
      actualcomment: ytData.items,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching comments" });
  }
};

export const commentlike = async (req, res) => {
  try {
    const commentId = req.params.id;
    const findComment = await Comment.findById(commentId);

    if (findComment.comment_likes.includes(req.user?._id)) {
      return res.status(400).json({ message: "Already liked" });
    }

    findComment.comment_likes.push(req.user?._id);
    await findComment.save();

    res.status(200).json({ message: "Comment liked" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Like failed" });
  }
};

export const commentunlike = async (req, res) => {
  try {
    const findComment = await Comment.findById(req.params.id);

    findComment.comment_likes = findComment.comment_likes.filter(
      (id) => id.toString() !== req.user?._id.toString(),
    );

    await findComment.save();
    res.status(200).json({ message: "Comment unliked" });
  } catch (error) {
    res.status(500).json({ message: "Unlike failed" });
  }
};

export const commentdelete = async (req, res) => {
  try {
    await Comment.findOneAndDelete({
      _id: req.params.id,
      comment_user_id: req.user?._id,
    });

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

export const like = async (req, res) => {
  try {
    const vedioid = req.params.id;

    const alreadyLiked = await Like.findOne({
      vedio_id: vedioid,
      like_user: req.user?._id,
    });

    if (alreadyLiked) {
      return res.status(400).json({ message: "Already liked" });
    }

    await Like.create({
      vedio_id: vedioid,
      like_user: req.user?._id,
    });

    res.status(200).json({ message: "Video liked" });
  } catch (error) {
    res.status(500).json({ message: "Like failed" });
  }
};

export const unlike = async (req, res) => {
  try {
    await Like.findOneAndDelete({
      vedio_id: req.params.id,
      like_user: req.user._id,
    });

    res.status(200).json({ message: "Video unliked" });
  } catch (error) {
    res.status(500).json({ message: "Unlike failed" });
  }
};

export const getlike = async (req, res) => {
  try {
    const likes = await Like.find({
      vedio_id: req.params?.id,
    }).populate("like_user");

    res.status(200).json({
      likecount: likes.length,
      likes,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching likes" });
  }
};
