import prisma from "../libs/db.js";
export const createBookmark = async (req, res) => {
    const { name, description } = req.body;
    const userId = req.user.id;
    try {
        const bookmark = await prisma.bookmark.create({
            data: { name, description: description || null, userId },
        });
        res.status(201).json({
            success: true,
            message: "Bookmark created successfully",
            bookmark,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to create bookmark",
        });
    }
};
export const getBookmarks = async (req, res) => {
    try {
        const bookmarks = await prisma.bookmark.findMany({
            where: { userId: req.user.id },
            include: { problems: true },
        });
        res.status(200).json({
            success: true,
            message: "Bookmarks retrieved successfully",
            bookmarks,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve bookmarks",
        });
    }
};
export const getBookmarkById = async (req, res) => {
    const { bookmarkId } = req.params;
    try {
        const bookmark = await prisma.bookmark.findUnique({
            where: { id: bookmarkId, userId: req.user.id },
            include: { problems: true },
        });
        if (!bookmark) {
            res.status(404).json({
                success: false,
                message: "Bookmark not found",
            });
            return;
        }
        res.status(200).json({
            success: true,
            message: "Bookmark retrieved successfully",
            bookmark,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to retrieve bookmark",
        });
    }
};
export const addProblemsToBookmark = async (req, res) => {
    const { bookmarkId } = req.params;
    const { problemIds } = req.body;
    if (!problemIds.length || !Array.isArray(problemIds)) {
        res.status(400).json({
            success: false,
            message: "Invalid problem IDs",
        });
        return;
    }
    const connectData = problemIds.map((problemId) => ({ id: problemId }));
    try {
        const bookmark = await prisma.bookmark.update({
            where: { id: bookmarkId, userId: req.user.id },
            data: { problems: { connect: connectData } },
        });
        res.status(200).json({
            success: true,
            message: "Problems added to bookmark successfully",
            bookmark,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to add problems to bookmark",
        });
    }
};
export const deleteProblemsFromBookmark = async (req, res) => {
    const { bookmarkId } = req.params;
    const { problemIds } = req.body;
    if (!problemIds.length || !Array.isArray(problemIds)) {
        res.status(400).json({
            success: false,
            message: "Invalid problem IDs",
        });
        return;
    }
    const disconnectData = problemIds.map((problemId) => ({ id: problemId }));
    try {
        const bookmark = await prisma.bookmark.update({
            where: { id: bookmarkId, userId: req.user.id },
            data: { problems: { disconnect: disconnectData } },
        });
        res.status(200).json({
            success: true,
            message: "Problems deleted from bookmark successfully",
            bookmark,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete problems from bookmark",
        });
    }
};
export const deleteBookmark = async (req, res) => {
    const { bookmarkId } = req.params;
    try {
        const bookmark = await prisma.bookmark.delete({
            where: { id: bookmarkId, userId: req.user.id },
        });
        res.status(200).json({
            success: true,
            message: "Bookmark deleted successfully",
            bookmark,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete bookmark",
        });
    }
};
//# sourceMappingURL=bookmark.controller.js.map