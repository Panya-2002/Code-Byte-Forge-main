import db from "../../../Firebase/Firebase-admin";

export default async (req, res) => {
  const { pid } = req.query;
  const commentsRef = db.collection("posts").doc(pid).collection("comments");
  const snapshot = await commentsRef.orderBy("date", "desc").get();
  const comments = [];
  snapshot.forEach((doc) => {
    const data = {
      id: doc.id,
      comment: doc.data().comment,
      userName: doc.data().userName,
      userImage: doc.data().userImage,
      date: doc.data().date.toDate().toDateString(),
      userId: doc.data().userId,
    };
    comments.push(data);
  });

  res.status(200).json({ comments: comments });
};
