import { Navigate, Route, Routes } from "react-router-dom";
import LandingPage from "../pages/Landing/LandingPage";
import SignInPage from "../pages/Auth/SignInPage";
import SignUpPage from "../pages/Auth/SignUpPage";
import DashboardPage from "../pages/Dashboard/DashboardPage";
import CourseCatalogPage from "../pages/Courses/CourseCatalogPage";
import CourseDetailsPage from "../pages/Courses/CourseDetailsPage";
import LessonPage from "../pages/Lessons/LessonPage";
import AssignmentSubmissionPage from "../pages/Assignments/AssignmentSubmissionPage";
import ProgressTrackingPage from "../pages/Progress/ProgressTrackingPage";
import DiscussionPage from "../pages/Discussions/DiscussionPage";
import NotificationsPage from "../pages/Notifications/NotificationsPage";
import UserProfilePage from "../pages/Profile/UserProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { ROUTES } from "../utils/constants";

function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.landing} element={<LandingPage />} />
      <Route
        path={ROUTES.signin}
        element={
          <PublicRoute>
            <SignInPage />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.signup}
        element={
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        }
      />
      <Route
        path={ROUTES.dashboard}
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path={ROUTES.courses} element={<CourseCatalogPage />} />
      <Route path={ROUTES.courseDetails} element={<CourseDetailsPage />} />
      <Route path={ROUTES.lessons} element={<LessonPage />} />
      <Route path={ROUTES.assignments} element={<AssignmentSubmissionPage />} />
      <Route path={ROUTES.progress} element={<ProgressTrackingPage />} />
      <Route path={ROUTES.discussions} element={<DiscussionPage />} />
      <Route path={ROUTES.notifications} element={<NotificationsPage />} />
      <Route path={ROUTES.profile} element={<UserProfilePage />} />
      <Route path="/home" element={<Navigate replace to={ROUTES.dashboard} />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
