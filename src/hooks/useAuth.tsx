import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { UserRequest } from "@/interface/types";
import { setFullScreenLoading } from "@/reducer/commonSlice";
import { setUser } from "@/reducer/userSlice";
import { useAuthenticateUserMutation } from "@/service/auth";

const useAuth = () => {
	const user = useSelector(({ user }: RootState) => user.userInfo);
	const [authUser] = useAuthenticateUserMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const token = localStorage.getItem("token");
	const isLoggedIn = user && token;

	const logout = () => {
		localStorage.clear();
		dispatch(setUser(null));
	};

	const login = (values: UserRequest) => {
		dispatch(setFullScreenLoading(true));

		return authUser(values)
			.unwrap()
			.then((data) => {
				if (data) {
					localStorage.setItem("token", data.token);
					dispatch(setUser({ ...data, email: values.email }));
					navigate("/app");
				}
			})
			.catch((error) => console.log(error))
			.finally(() => dispatch(setFullScreenLoading(false)));
	};

	return { user, token, isLoggedIn, login, logout };
};

export default useAuth;
