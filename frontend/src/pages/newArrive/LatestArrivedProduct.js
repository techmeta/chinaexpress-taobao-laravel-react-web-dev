import React, {useEffect} from "react";
import {withRouter} from "react-router-dom";
import CategorySidebar from "./includes/CategorySidebar";
import {goPageTop} from "../../utils/Helpers";
import SubCategory from "./includes/SubCategory";
import Defaul404 from "../404/Defaul404";
import {useNewArrivedProducts} from "../../api/ProductApi";
import RecentItems from "../home/includes/Products/NewArriveProduct/includes/RecentItems";

const LatestArrivedProduct = (props) => {

	const {data: products, isLoading} = useNewArrivedProducts();

	useEffect(() => {
		goPageTop();
	}, []);

	if (isLoading) {
		return '';
	}

	// if (!products?.id) {
	// 	return <Defaul404/>;
	// }

	return (
		<main className="main">

			<div className="page-content">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="card my-5">
								<div className="card-body">
									<div className="mb-3">
										<h2>New Arrived Products</h2>
									</div>
									<div className="cat-blocks-container">
										<RecentItems products={products}/>
									</div>

								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</main>
	);
};


export default withRouter(LatestArrivedProduct);