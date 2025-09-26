import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.DB_ROADMAP_HOST,
  port: Number(process.env.DB_ROADMAP_PORT),
  database: process.env.DB_ROADMAP_NAME,
  user: process.env.DB_ROADMAP_USER,
  password: process.env.DB_ROADMAP_PASS,
  charset: process.env.DB_CHARSET,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export interface User {
  id: string;
  name: string;
  email: string;
  password?: string; // Password hash
}

export interface UserRoadmapProgress {
  userId: string;
  currentPhase: number;
  completedPhases: number[];
}

export const getUserForAuth = async (email: string): Promise<User | null> => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (Array.isArray(rows) && rows.length > 0) {
      return rows[0] as User;
    }
    return null;
  } catch (error) {
    console.error("Error fetching user for auth:", error);
    return null;
  }
};

export const getRoadmapProgress = async (userId: string): Promise<UserRoadmapProgress | null> => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM roadmap_progress WHERE user_id = ?',
      [userId]
    );
    
    if (Array.isArray(rows) && rows.length > 0) {
      const row = rows[0] as any;
      return {
        userId: row.user_id,
        currentPhase: row.current_phase,
        completedPhases: JSON.parse(row.completed_phases || '[]'),
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching roadmap progress:", error);
    return null;
  }
};

export const updateRoadmapProgress = async (userId: string, progress: Partial<UserRoadmapProgress>): Promise<UserRoadmapProgress | null> => {
  try {
    const existingProgress = await getRoadmapProgress(userId) || { userId, currentPhase: 1, completedPhases: [] };
    
    const newProgress = {
      ...existingProgress,
      ...progress,
    };

    const completedPhases = JSON.stringify(newProgress.completedPhases || []);

    await pool.execute(
      `INSERT INTO roadmap_progress (user_id, current_phase, completed_phases)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE current_phase = VALUES(current_phase), completed_phases = VALUES(completed_phases)`,
      [userId, newProgress.currentPhase, completedPhases]
    );

    return newProgress;
  } catch (error) {
    console.error("Error updating roadmap progress:", error);
    return null;
  }
};